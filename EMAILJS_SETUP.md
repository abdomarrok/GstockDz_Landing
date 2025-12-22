# EmailJS Setup Guide for Contact Form

The contact form is now configured to use **EmailJS** for sending emails. Follow these steps to complete the setup:

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Confirm your email address

## Step 2: Add Email Service

1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection instructions
5. **Copy your Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

```
Subject: رسالة جديدة من {{user_name}}

من: {{user_name}}
البريد الإلكتروني: {{user_email}}

الرسالة:
{{message}}
```

4. **Copy your Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"**
2. Find your **Public Key** (e.g., `ABCdef123XYZ`)
3. Copy it

## Step 5: Update Configuration

Open `js/contact-form.js` and replace these values:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_ACTUAL_PUBLIC_KEY',      // From Step 4
    SERVICE_ID: 'YOUR_ACTUAL_SERVICE_ID',      // From Step 2
    TEMPLATE_ID: 'YOUR_ACTUAL_TEMPLATE_ID'     // From Step 3
};
```

## Step 6: Test

1. Open your landing page
2. Fill out the contact form
3. Click "إرسال" (Send)
4. You should receive the email!

## Free Tier Limits

EmailJS free tier includes:
- ✅ 200 emails per month
- ✅ 2 email services
- ✅ 2 email templates
- ✅ Basic support

This is perfect for a landing page!

## Alternative: Use Direct mailto Link

If you prefer a simpler solution without EmailJS:

Replace the form with a mailto link in `index.html`:

```html
<a href="mailto:marrokmar@gmail.com?subject=استفسار عن GstockDZ" 
   class="btn-ripple w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center block">
    <i class="fas fa-envelope ml-2"></i>
    راسلنا عبر البريد الإلكتروني
</a>
```

## Troubleshooting

**Form shows "يرجى تكوين EmailJS أولاً"**
- You haven't replaced the placeholder values in `js/contact-form.js`

**Emails not sending:**
- Check browser console for errors
- Verify all 3 IDs are correct
- Make sure email service is connected in EmailJS dashboard
- Check your EmailJS free tier quota (200/month)

**Need help?**
EmailJS documentation: https://www.emailjs.com/docs/
