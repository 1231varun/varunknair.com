// Example Netlify serverless function for custom contact form handling
// Place this file in: netlify/functions/contact.ts

// Note: Install @netlify/functions when using this: npm install @netlify/functions

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// @ts-ignore - Optional dependency for serverless function
export const handler = async (event: any, context: any) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const data: ContactFormData = JSON.parse(event.body || '{}')
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'All fields are required' })
      }
    }

    // Here you can integrate with your preferred email service:
    
    // Option 1: SendGrid
    // const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    // await sgMail.send({
    //   to: process.env.CONTACT_EMAIL,
    //   from: process.env.FROM_EMAIL,
    //   subject: `Contact Form: ${data.subject}`,
    //   html: `
    //     <h3>New Contact Form Submission</h3>
    //     <p><strong>Name:</strong> ${data.name}</p>
    //     <p><strong>Email:</strong> ${data.email}</p>
    //     <p><strong>Subject:</strong> ${data.subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${data.message}</p>
    //   `
    // })

    // Option 2: Resend
    // const { Resend } = require('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: process.env.FROM_EMAIL,
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `Contact Form: ${data.subject}`,
    //   html: `...`
    // })

    // Option 3: Nodemailer (with SMTP)
    // const nodemailer = require('nodemailer')
    // const transporter = nodemailer.createTransporter({...})
    // await transporter.sendMail({...})

    console.log('Contact form submission received:', data)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        message: 'Message sent successfully!' 
      })
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send message. Please try again.' 
      })
    }
  }
}

// To use this function:
// 1. Create netlify/functions/ directory in your project root
// 2. Place this file as netlify/functions/contact.ts
// 3. Install dependencies: npm install @netlify/functions
// 4. Set environment variables in Netlify dashboard:
//    - SENDGRID_API_KEY (if using SendGrid)
//    - RESEND_API_KEY (if using Resend)
//    - CONTACT_EMAIL (your email address)
//    - FROM_EMAIL (verified sender email)
// 5. Update your .env: VITE_CONTACT_PROVIDER="custom" and VITE_CONTACT_ENDPOINT="/.netlify/functions/contact" 