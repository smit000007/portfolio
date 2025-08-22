# EmailJS Setup Guide for Contact Form

This guide will help you set up EmailJS to receive emails from your contact form.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```html
Subject: New Contact Form Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to "Account" → "API Keys" in your dashboard
2. Copy your **Public Key** (e.g., `user_def456`)

## Step 5: Update Your Code

✅ **CONFIGURATION COMPLETE!** Your EmailJS is now properly configured with:

```javascript
// EmailJS Configuration (Already set up)
emailjs.init("dQmrhnlupg0TUCIgL"); // Public Key
emailjs.send('service_e38iyv4', 'template_3nyenng', templateParams);
```

**Your current configuration:**
- **Public Key**: `dQmrhnlupg0TUCIgL`
- **Service ID**: `service_e38iyv4`
- **Template ID**: `template_3nyenng`

## Step 6: Test Your Setup

1. Open your website
2. Fill out the contact form
3. Submit the form
4. Check your email for the message
5. Check the browser console for any errors

## Troubleshooting

### Common Issues:

1. **"EmailJS is not defined" error**
   - Make sure the EmailJS CDN is loaded before your script.js
   - Check that the CDN link is working

2. **"Service not found" error**
   - Verify your Service ID is correct
   - Make sure your email service is properly connected

3. **"Template not found" error**
   - Verify your Template ID is correct
   - Make sure the template is published

4. **Emails not being received**
   - Check your spam folder
   - Verify your email service is working
   - Check EmailJS dashboard for delivery status

### Testing in Development:

For local development, you can use EmailJS's test mode or set up a test email service.

## Security Notes

- Your Public Key is safe to expose in client-side code
- Never expose your Private Key
- Consider rate limiting on your form to prevent spam

## Free Plan Limitations

EmailJS free plan includes:
- 200 emails per month
- Basic email templates
- Standard support

For more emails or advanced features, consider upgrading to a paid plan.

## Support

If you encounter issues:
1. Check EmailJS documentation: https://www.emailjs.com/docs/
2. Check browser console for error messages
3. Verify all IDs and keys are correct
4. Test with a simple template first

## Additional Features You Can Add

1. **Auto-reply to sender**: Create a second template for auto-replies
2. **Form validation**: Already implemented in the code
3. **Rate limiting**: Prevent spam submissions
4. **File attachments**: Allow file uploads (requires paid plan)
5. **Custom styling**: Style your email templates

## Example Complete Configuration

```javascript
// Initialize EmailJS
emailjs.init("user_your_public_key_here");

// Send email
emailjs.send(
    'service_your_service_id_here',
    'template_your_template_id_here',
    {
        from_name: "John Doe",
        from_email: "john@example.com",
        subject: "Portfolio Inquiry",
        message: "Hello, I'm interested in your services...",
        to_name: "Smit Malaviya",
        reply_to: "john@example.com"
    }
);
```

Your contact form is now ready to receive emails! 🚀
