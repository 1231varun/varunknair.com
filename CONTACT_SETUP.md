# Contact Form Setup Guide

This project supports multiple contact form providers. You can easily switch between them by changing the `VITE_CONTACT_PROVIDER` environment variable.

## Available Providers

### 1. Netlify Forms (Default)

**Best for:** Netlify deployments, zero configuration
**Cost:** Free tier available

1. Set `VITE_CONTACT_PROVIDER="netlify"` in your `.env` file
2. Deploy to Netlify - forms are automatically detected
3. No additional configuration needed

### 2. Vercel

**Best for:** Vercel deployments
**Cost:** Free tier available

1. Set `VITE_CONTACT_PROVIDER="vercel"` in your `.env` file
2. Create an API route at `/api/contact.js` or `/api/contact.ts`:

```javascript
// api/contact.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body

  try {
    // Send email using your preferred method (SendGrid, Resend, etc.)
    // Example with SendGrid:
    // await sendEmail({ to: 'your@email.com', from: email, subject, html: message })
    
    res.status(200).json({ message: 'Message sent successfully!' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' })
  }
}
```

### 3. Formspree

**Best for:** Quick setup, no backend required
**Cost:** Free tier available (50 submissions/month)

1. Go to [formspree.io](https://formspree.io) and create an account
2. Create a new form and get your form endpoint
3. Set environment variables:
   ```
   VITE_CONTACT_PROVIDER="formspree"
   VITE_CONTACT_ENDPOINT="https://formspree.io/f/YOUR_FORM_ID"
   ```

### 4. EmailJS

**Best for:** Frontend-only solution, no backend required
**Cost:** Free tier available (200 emails/month)

1. Go to [emailjs.com](https://www.emailjs.com) and create an account
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Set environment variables:
   ```
   VITE_CONTACT_PROVIDER="emailjs"
   VITE_EMAILJS_SERVICE_ID="your_service_id"
   VITE_EMAILJS_TEMPLATE_ID="your_template_id"
   VITE_EMAILJS_PUBLIC_KEY="your_public_key"
   ```
5. Install EmailJS: `npm install @emailjs/browser`

### 5. Custom Backend

**Best for:** Full control, custom requirements
**Cost:** Depends on your implementation

1. Set environment variables:
   ```
   VITE_CONTACT_PROVIDER="custom"
   VITE_CONTACT_ENDPOINT="https://your-api.com/contact"
   VITE_CONTACT_API_KEY="your_api_key"  # Optional
   ```

2. Your API should accept POST requests with this JSON structure:
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "subject": "Subject",
     "message": "Message content"
   }
   ```

3. Return success/error responses:
   ```json
   // Success
   { "message": "Message sent successfully!" }
   
   // Error
   { "error": "Error message" }
   ```

## Switching Providers

To switch providers, simply:

1. Update `VITE_CONTACT_PROVIDER` in your `.env` file
2. Set the required environment variables for your chosen provider
3. Rebuild and redeploy your application

## Security Considerations

- **Environment Variables:** Never commit your `.env` file with real API keys
- **Rate Limiting:** Consider implementing rate limiting for custom backends
- **Validation:** Server-side validation is always recommended
- **Spam Protection:** Consider adding CAPTCHA for public forms

## Deployment Platform Setup

### Netlify
1. Go to Site Settings → Environment Variables
2. Add all your `VITE_*` variables
3. Redeploy your site

### Vercel
1. Go to Project Settings → Environment Variables
2. Add all your `VITE_*` variables
3. Redeploy your project

### Other Platforms
Add environment variables through your platform's dashboard or CLI. 