const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  // Use environment variables for email configuration
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true' || false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Send email
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Result Institute'}" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
};

// Email templates

// Welcome email
const sendWelcomeEmail = async (user) => {
  const subject = 'Welcome to Result Institute Training Management System';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #6366f1;">Welcome to Result Institute!</h2>
      <p>Hello ${user.first_name} ${user.last_name},</p>
      <p>Welcome to the Result Institute Training Management System. Your account has been successfully created.</p>
      <p><strong>Your login credentials:</strong></p>
      <ul>
        <li>Email: ${user.email}</li>
        <li>Role: ${user.role}</li>
      </ul>
      <p>Please log in and change your password at your earliest convenience.</p>
      <p><a href="${process.env.FRONTEND_URL || 'https://resultinstitude.fayshaa.com'}/login"
         style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
         Login to Your Account
      </a></p>
      <p>If you have any questions, feel free to contact us.</p>
      <p>Best regards,<br>Result Institute Team</p>
    </div>
  `;

  return await sendEmail({ to: user.email, subject, html });
};

// Training enrollment notification
const sendEnrollmentNotification = async (enrollment, session, user) => {
  const subject = 'Training Enrollment Confirmation';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #6366f1;">Training Enrollment Confirmation</h2>
      <p>Hello ${user.first_name} ${user.last_name},</p>
      <p>You have been successfully enrolled in the following training session:</p>
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">${session.title_en}</h3>
        <p><strong>Start Date:</strong> ${new Date(session.start_date).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> ${new Date(session.end_date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> ${session.location || 'TBA'}</p>
        <p><strong>Status:</strong> ${enrollment.status}</p>
      </div>
      ${enrollment.status === 'pending' ?
        '<p>Your enrollment is pending approval. You will be notified once it is approved.</p>' :
        '<p>Your enrollment has been approved! We look forward to seeing you.</p>'
      }
      <p>Best regards,<br>Result Institute Team</p>
    </div>
  `;

  return await sendEmail({ to: user.email, subject, html });
};

// Password reset email
const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL || 'https://resultinstitude.fayshaa.com'}/reset-password/${resetToken}`;
  const subject = 'Password Reset Request';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #6366f1;">Password Reset Request</h2>
      <p>Hello ${user.first_name} ${user.last_name},</p>
      <p>You requested to reset your password. Click the button below to reset it:</p>
      <p><a href="${resetUrl}"
         style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
         Reset Password
      </a></p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Best regards,<br>Result Institute Team</p>
    </div>
  `;

  return await sendEmail({ to: user.email, subject, html });
};

// Certificate issued notification
const sendCertificateNotification = async (user, session) => {
  const subject = 'Training Certificate Issued';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #10b981;">Congratulations! 🎉</h2>
      <p>Hello ${user.first_name} ${user.last_name},</p>
      <p>Congratulations on completing the training session:</p>
      <h3>${session.title_en}</h3>
      <p>Your certificate has been issued and is now available in your dashboard.</p>
      <p><a href="${process.env.FRONTEND_URL || 'https://resultinstitude.fayshaa.com'}/dashboard"
         style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
         View Certificate
      </a></p>
      <p>Keep up the great work!</p>
      <p>Best regards,<br>Result Institute Team</p>
    </div>
  `;

  return await sendEmail({ to: user.email, subject, html });
};

// Attendance reminder
const sendAttendanceReminder = async (user, session, date) => {
  const subject = `Training Session Reminder - ${date}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #f59e0b;">Training Session Reminder</h2>
      <p>Hello ${user.first_name} ${user.last_name},</p>
      <p>This is a reminder for your upcoming training session:</p>
      <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
        <h3 style="margin-top: 0;">${session.title_en}</h3>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Location:</strong> ${session.location || 'Online'}</p>
        ${session.online_link ? `<p><strong>Join Link:</strong> <a href="${session.online_link}">${session.online_link}</a></p>` : ''}
      </div>
      <p>Please make sure to attend on time.</p>
      <p>Best regards,<br>Result Institute Team</p>
    </div>
  `;

  return await sendEmail({ to: user.email, subject, html });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendEnrollmentNotification,
  sendPasswordResetEmail,
  sendCertificateNotification,
  sendAttendanceReminder
};
