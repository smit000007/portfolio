# EmailJS Troubleshooting Guide

## Current Configuration
- **Public Key**: `dQmrhnlupg0TUCIgL`
- **Service ID**: `service_e38iyv4`
- **Template ID**: `template_3nyenng`

## Step-by-Step Troubleshooting

### 1. Check Browser Console
1. Open your website in a browser
2. Right-click and select "Inspect" or press F12
3. Go to the "Console" tab
4. Look for any error messages related to EmailJS
5. Try submitting the contact form and check for errors

### 2. Test EmailJS Connection
- A blue "Test EmailJS" button has been added to the bottom-right corner of your website
- Click this button to test the EmailJS connection
- Check the console for detailed results

### 3. Verify EmailJS Dashboard Settings

#### Check Service Configuration:
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to "Email Services"
3. Verify that `service_e38iyv4` exists and is active
4. Check if the service is properly configured (Gmail, Outlook, etc.)

#### Check Template Configuration:
1. Go to "Email Templates"
2. Verify that `template_3nyenng` exists
3. Check the template variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`
   - `{{to_name}}`
   - `{{reply_to}}`

#### Check Public Key:
1. Go to "Account" → "API Keys"
2. Verify that `dQmrhnlupg0TUCIgL` is your active public key
3. Make sure the key is not expired or disabled

### 4. Common Issues and Solutions

#### Issue: "EmailJS library not loaded"
**Solution**: 
- Check your internet connection
- Verify the EmailJS CDN is loading: `<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>`

#### Issue: "Authentication failed" (401 error)
**Solution**:
- Verify your Public Key is correct
- Check if your EmailJS account is active
- Ensure you haven't exceeded your monthly email limit

#### Issue: "Service or template not found" (404 error)
**Solution**:
- Double-check your Service ID and Template ID
- Ensure the service and template are published and active
- Verify you're using the correct IDs from your EmailJS dashboard

#### Issue: "Invalid request" (400 error)
**Solution**:
- Check that all required template variables are being sent
- Verify the template variables match exactly (case-sensitive)
- Ensure the email format is valid

#### Issue: "Too many requests" (429 error)
**Solution**:
- Wait a few minutes before trying again
- Check your EmailJS plan limits
- Consider upgrading your plan if you're sending many emails

### 5. EmailJS Plan Limits
- **Free Plan**: 200 emails/month
- **Personal Plan**: 1,000 emails/month
- **Business Plan**: 10,000 emails/month

Check your current usage in the EmailJS dashboard.

### 6. Template Variable Checklist
Make sure your EmailJS template includes these variables:
```
From: {{from_name}} ({{from_email}})
Subject: {{subject}}
Message: {{message}}
To: {{to_name}}
Reply-To: {{reply_to}}
```

### 7. Testing Steps
1. **Test the form**: Fill out and submit the contact form
2. **Check console**: Look for success/error messages
3. **Check EmailJS logs**: Go to EmailJS dashboard → "Email Logs"
4. **Check your email**: Look in your inbox and spam folder
5. **Test with different email**: Try sending from a different email address

### 8. Alternative Solutions

#### If EmailJS continues to fail:
1. **Use a different email service**: Consider Netlify Forms, Formspree, or Google Forms
2. **Backup contact method**: Ensure your direct email (smitmalaviya2006@gmail.com) is visible
3. **Contact EmailJS support**: If you're sure your configuration is correct

### 9. Debug Information
The enhanced code now provides detailed logging. Check the browser console for:
- EmailJS initialization status
- Form validation results
- Template parameters being sent
- Success/error responses from EmailJS

### 10. Quick Fix Checklist
- [ ] EmailJS CDN is loaded
- [ ] Public Key is correct
- [ ] Service ID is correct and active
- [ ] Template ID is correct and published
- [ ] Template variables match the code
- [ ] EmailJS account is active
- [ ] Monthly email limit not exceeded
- [ ] No JavaScript errors in console

## Need Help?
If you're still having issues after following this guide:
1. Check the browser console for specific error messages
2. Verify all IDs in your EmailJS dashboard
3. Test with the "Test EmailJS" button
4. Contact EmailJS support with your specific error messages
