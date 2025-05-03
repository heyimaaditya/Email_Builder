import nodemailer from 'nodemailer';
import config from '../config/index.js';

const transporter = nodemailer.createTransport({
  host: config.emailHost,
  port: config.emailPort,
  secure: config.emailSecure,
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
});

const sendEmail = async (to, subject, body) => {
  try {
    const mailOptions = {
      from: `"Flow Builder" <${config.emailUser}>`,
      to: to,
      subject: subject, 
      text: body, 
   
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
   
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default {
  sendEmail,
};