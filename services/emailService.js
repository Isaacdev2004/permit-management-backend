const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    console.log('📧 Using mock email service for demonstration.');
    this.transporter = {
      sendMail: async (opts) => {
        console.log('--- MOCK EMAIL SENT ---');
        console.log('To:', opts.to);
        console.log('Subject:', opts.subject);
        console.log('-----------------------');
        return { messageId: 'mock-' + Date.now() };
      },
      verify: async () => true,
    };
  }

  async sendTestEmail(email) {
    const sampleData = [{ id: 'TEST-1', details: 'This is a test permit' }];
    const subject = 'Test Email';
    const html = '<h1>This is a test</h1>';
    
    await this.transporter.sendMail({
      from: '"Permit Platform" <noreply@example.com>',
      to: email,
      subject,
      html,
    });
    return { success: true };
  }
}

module.exports = new EmailService();
