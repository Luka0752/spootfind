import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'

// 生成随机密码
function generateTempPassword(): string {
  return Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
}

// 发送邮件通知
async function sendNotificationEmail(
  userEmail: string,
  userName: string,
  productName: string,
  market: string,
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

  // 给管理员的通知
  const adminMail = {
    from: process.env.SMTP_USER,
    to: notificationEmail,
    subject: `[Spootfind] 新需求提交 - ${productName}`,
    html: `
      <h2>新的采购需求</h2>
      <p><strong>客户:</strong> ${userName} (${userEmail})</p>
      <p><strong>产品:</strong> ${productName}</p>
      <p><strong>目标市场:</strong> ${market}</p>
      <p><strong>新用户:</strong> ${isNewUser ? '是' : '否'}</p>
      <hr>
      <p>请登录后台查看详情</p>
    `
  }

  await transporter.sendMail(adminMail)

  // 如果是新用户，发送账号信息
  if (isNewUser && tempPassword) {
    const userMail = {
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
    }

    await transporter.sendMail(userMail)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, phone, productName, market, images, price, source, expectedTime, notes } = body

    // 验证必填字段
    if (!email || !name || !productName || !market) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 检查用户是否已存在
    let user = await prisma.user.findUnique({
      where: { email }
    })

    let isNewUser = false
    let tempPassword: string | undefined

    // 如果用户不存在，自动创建账号
    if (!user) {
      tempPassword = generateTempPassword()
      const hashedPassword = await bcrypt.hash(tempPassword, 10)
      
      user = await prisma.user.create({
        data: {
          email,
          name,
          phone: phone || null,
          password: hashedPassword
        }
      })
      isNewUser = true
    }

    // 创建需求
    const requestRecord = await prisma.request.create({
      data: {
        userId: user.id,
        productName,
        market,
        images: images || null,
        price: price || null,
        source: source || null,
        expectedTime: expectedTime || null,
        notes: notes || null
      }
    })

    // 发送邮件通知（异步，不阻塞响应）
    sendNotificationEmail(
      email,
      name,
      productName,
      market,
      isNewUser,
      tempPassword
    ).catch(console.error)

    return NextResponse.json({
      success: true,
      requestId: requestRecord.id,
      isNewUser,
      message: isNewUser 
        ? 'Request submitted successfully! An account has been created for you. Please check your email for login details.'
        : 'Request submitted successfully!'
    })
  } catch (error) {
    console.error('Request submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit request' },
      { status: 500 }
    )
  }
}

// 获取用户的需求列表
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
