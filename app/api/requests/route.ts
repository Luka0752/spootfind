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
  details: string,
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

  // Admin notification
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: notificationEmail,
    subject: `[Spootfind] New Request from ${userName}`,
    html: `
      <h2>New Sourcing Request</h2>
      <p><strong>Customer:</strong> ${userName} (${userEmail})</p>
      <p><strong>Details:</strong></p>
      <p>${details.replace(/\n/g, '<br>')}</p>
      <p><strong>New user:</strong> ${isNewUser ? 'Yes' : 'No'}</p>
      <hr>
      <p>Check admin panel for details</p>
    `
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
    const { email, name, details } = body

    if (!email || !name || !details) {
      return NextResponse.json(
        { error: 'Missing required fields: email, name, details' },
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

    // Create request — store details as notes (most flexible field)
    const requestRecord = await prisma.request.create({
      data: {
        userId: user.id,
        productName: details.slice(0, 100), // First 100 chars as summary
        market: 'TBD', // Will be determined by admin
        notes: details
      }
    })

    // Send notification email (async, non-blocking)
    sendNotificationEmail(
      email,
      name,
      details,
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
