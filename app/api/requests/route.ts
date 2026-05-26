import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'

function generateTempPassword(): string {
  return Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
}

async function sendNotificationEmail(
  userEmail: string,
  userName: string,
  data: {
    targetMarket: string
    orderScale: string
    targetPrice: string
    certification: string
    details: string
  },
  isNewUser: boolean,
  tempPassword?: string
) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.126.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'hao8454@126.com'

  // Build email content
  const marketMap: Record<string, string> = {
    'Australia': '🇦🇺 澳洲',
    'Southeast Asia': '🌏 东南亚',
    'North America': '🇺🇸 北美',
    'Europe': '🇪🇺 欧洲',
    'Middle East': '🌍 中东',
    'South America': '🌎 南美',
    'Africa': '🌍 非洲',
    'Other': '🌐 其他'
  }

  const scaleMap: Record<string, string> = {
    'Sample': '样品单 (50-100件)',
    'Small': '小批量 (100-500件)',
    'Bulk': '大货 (500+件)',
    'Not Sure': '待定'
  }

  const certMap: Record<string, string> = {
    'None': '无',
    'CE': 'CE认证',
    'RCM/AS-NZS': 'RCM/AS-NZS认证',
    'UL/ETL': 'UL/ETL认证',
    'FCC': 'FCC认证',
    'Other': '其他'
  }

  // Admin notification email (in Chinese for 昊)
  const adminEmailHtml = `
    <h2>🛒 新询盘通知</h2>
    <hr>
    
    <h3>📧 客户信息</h3>
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>客户名称:</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${userName}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>邮箱:</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${userEmail}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>新用户:</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${isNewUser ? '✅ 是' : '❌ 否'}</td>
      </tr>
    </table>

    <h3>📋 采购需求</h3>
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>目标市场:</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${marketMap[data.targetMarket] || data.targetMarket}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>采购规模:</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${scaleMap[data.orderScale] || data.orderScale}</td>
      </tr>
      ${data.targetPrice ? `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>目标价格:</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.targetPrice}</td>
      </tr>
      ` : ''}
      ${data.certification ? `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>认证需求:</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${certMap[data.certification] || data.certification}</td>
      </tr>
      ` : ''}
    </table>

    <h3>📝 详情描述</h3>
    <div style="padding: 12px; background: #f5f5f5; border-radius: 8px;">
      ${data.details.replace(/\n/g, '<br>')}
    </div>

    <hr>
    <p><small>来自 Spootfind 网站询盘表单</small></p>
  `

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: notificationEmail,
    subject: `[Spootfind] 🛒 新询盘 - ${userName}${data.targetMarket ? ' [' + (marketMap[data.targetMarket] || data.targetMarket) + ']' : ''}`,
    html: adminEmailHtml
  })

  // Welcome email for new users
  if (isNewUser && tempPassword) {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: userEmail,
      subject: 'Welcome to Spootfind - Your Account Information',
      html: `
        <h2>Welcome to Spootfind!</h2>
        <p>Thank you for submitting your request. An account has been created for you.</p>
        <p><strong>Your login credentials:</strong></p>
        <p>Email: ${userEmail}</p>
        <p>Temporary Password: ${tempPassword}</p>
        <p>Please change your password after first login.</p>
        <hr>
        <p>Visit <a href="${process.env.NEXTAUTH_URL}">${process.env.NEXTAUTH_URL}</a> to login</p>
      `
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      email, 
      name, 
      targetMarket, 
      orderScale, 
      targetPrice, 
      certification, 
      details 
    } = body

    if (!email || !name || !targetMarket || !orderScale || !details) {
      return NextResponse.json(
        { error: 'Missing required fields: email, name, targetMarket, orderScale, details' },
        { status: 400 }
      )
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email }
    })

    let isNewUser = false
    let tempPassword: string | undefined

    // Auto-create account if new user
    if (!user) {
      tempPassword = generateTempPassword()
      const hashedPassword = await bcrypt.hash(tempPassword, 10)
      
      user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword
        }
      })
      isNewUser = true
    }

    // Create request record with all fields
    const requestRecord = await prisma.request.create({
      data: {
        userId: user.id,
        productName: details.slice(0, 100),
        market: targetMarket,
        orderScale: orderScale,
        targetPrice: targetPrice || null,
        certification: certification || null,
        notes: details
      }
    })

    // Send notification email (async, non-blocking)
    sendNotificationEmail(
      email,
      name,
      { targetMarket, orderScale, targetPrice, certification, details },
      isNewUser,
      tempPassword
    ).catch(console.error)

    return NextResponse.json({
      success: true,
      requestId: requestRecord.id,
      isNewUser,
      message: isNewUser 
        ? 'Request submitted successfully! An account has been created for you. Please check your email for login details.'
        : 'Request submitted successfully! We will get back to you soon.'
    })
  } catch (error) {
    console.error('Request submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit request' },
      { status: 500 }
    )
  }
}

// GET user's requests
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID required' },
      { status: 400 }
    )
  }

  const requests = await prisma.request.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json({ requests })
}
