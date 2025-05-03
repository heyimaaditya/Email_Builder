import dotenv from 'dotenv';

dotenv.config();
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
export default {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/emailflow',
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  emailHost: process.env.EMAIL_HOST || 'smtp.gmail.com',
  emailPort: process.env.EMAIL_PORT || 587, 
  emailSecure: process.env.EMAIL_SECURE === 'true' || false, 
  jwtSecret: process.env.JWT_SECRET || 'defaultsecret',
  corsOrigin: allowedOrigin,
};