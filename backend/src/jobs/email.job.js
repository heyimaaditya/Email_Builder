import emailService from '../services/email.service.js';

const JOB_NAME = 'send email';

const register = (agenda) => {
  agenda.define(JOB_NAME, async (job) => {
    const { to, subject, body } = job.attrs.data;
    console.log(`Attempting to send email: To=${to}, Subject=${subject}`);
    try {
      await emailService.sendEmail(to, subject, body);
      console.log('Email sent successfully.');
    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error);
   
      throw error; 
    }
  });
};

export default {
  JOB_NAME,
  register,
};