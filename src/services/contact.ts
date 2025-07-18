import { ContactFormData } from '@/types'

/**
 * Contact Form Service - Multi-Provider Support
 * 
 * To change providers, update VITE_CONTACT_PROVIDER in your .env file:
 * - 'netlify' (default) - Uses Netlify Forms (zero config)
 * - 'vercel' - Uses Vercel API routes
 * - 'formspree' - Uses Formspree service
 * - 'emailjs' - Uses EmailJS (frontend-only)
 * - 'custom' - Your own API endpoint
 */

export interface ContactSubmissionResult {
  success: boolean
  message?: string
  error?: string
}

export type ContactProvider = 'netlify' | 'vercel' | 'formspree' | 'emailjs' | 'custom'

// Configuration from environment variables
const CONTACT_CONFIG = {
  provider: (import.meta.env.VITE_CONTACT_PROVIDER as ContactProvider) || 'netlify',
  endpoint: import.meta.env.VITE_CONTACT_ENDPOINT || '',
  apiKey: import.meta.env.VITE_CONTACT_API_KEY || '',
  emailjsServiceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  emailjsTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  emailjsPublicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
}

// Netlify Forms submission
async function submitToNetlify(data: ContactFormData): Promise<ContactSubmissionResult> {
  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': 'contact',
        ...data,
      }).toString(),
    })

    if (response.ok) {
      return { success: true, message: 'Message sent successfully!' }
    } else {
      return { success: false, error: 'Failed to send message. Please try again.' }
    }
  } catch (error) {
    return { success: false, error: 'Network error. Please try again.' }
  }
}

// Vercel submission (using Vercel API Routes)
async function submitToVercel(data: ContactFormData): Promise<ContactSubmissionResult> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (response.ok) {
      return { success: true, message: result.message || 'Message sent successfully!' }
    } else {
      return { success: false, error: result.error || 'Failed to send message.' }
    }
  } catch (error) {
    return { success: false, error: 'Network error. Please try again.' }
  }
}

// Formspree submission
async function submitToFormspree(data: ContactFormData): Promise<ContactSubmissionResult> {
  try {
    const response = await fetch(CONTACT_CONFIG.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      return { success: true, message: 'Message sent successfully!' }
    } else {
      return { success: false, error: 'Failed to send message. Please try again.' }
    }
  } catch (error) {
    return { success: false, error: 'Network error. Please try again.' }
  }
}

// EmailJS submission
async function submitToEmailJS(data: ContactFormData): Promise<ContactSubmissionResult> {
  try {
    // Import EmailJS - package is installed as dependency
    const emailjs = await import('@emailjs/browser')
    
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
    }

    await emailjs.send(
      CONTACT_CONFIG.emailjsServiceId,
      CONTACT_CONFIG.emailjsTemplateId,
      templateParams,
      CONTACT_CONFIG.emailjsPublicKey
    )

    return { success: true, message: 'Message sent successfully!' }
  } catch (error) {
    return { success: false, error: 'Failed to send message. Please try again.' }
  }
}

// Custom endpoint submission
async function submitToCustom(data: ContactFormData): Promise<ContactSubmissionResult> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // Add API key if provided
    if (CONTACT_CONFIG.apiKey) {
      headers['Authorization'] = `Bearer ${CONTACT_CONFIG.apiKey}`
    }

    const response = await fetch(CONTACT_CONFIG.endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (response.ok) {
      return { success: true, message: result.message || 'Message sent successfully!' }
    } else {
      return { success: false, error: result.error || 'Failed to send message.' }
    }
  } catch (error) {
    return { success: false, error: 'Network error. Please try again.' }
  }
}

// Main submission function that routes to the appropriate provider
export async function submitContactForm(data: ContactFormData): Promise<ContactSubmissionResult> {
  switch (CONTACT_CONFIG.provider) {
    case 'netlify':
      return submitToNetlify(data)
    case 'vercel':
      return submitToVercel(data)
    case 'formspree':
      return submitToFormspree(data)
    case 'emailjs':
      return submitToEmailJS(data)
    case 'custom':
      return submitToCustom(data)
    default:
      return { success: false, error: 'Contact provider not configured.' }
  }
}

// Validation function
export function validateContactForm(data: ContactFormData, t?: (key: string) => string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.name.trim()) {
    errors.push(t?.('contact.form.validation.nameRequired') || 'Name is required')
  }

  if (!data.email.trim()) {
    errors.push(t?.('contact.form.validation.emailRequired') || 'Email is required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push(t?.('contact.form.validation.emailInvalid') || 'Please enter a valid email address')
  }

  if (!data.subject.trim()) {
    errors.push(t?.('contact.form.validation.subjectRequired') || 'Subject is required')
  }

  if (!data.message.trim()) {
    errors.push(t?.('contact.form.validation.messageRequired') || 'Message is required')
  } else if (data.message.trim().length < 10) {
    errors.push(t?.('contact.form.validation.messageMinLength') || 'Message must be at least 10 characters long')
  }

  return { isValid: errors.length === 0, errors }
} 