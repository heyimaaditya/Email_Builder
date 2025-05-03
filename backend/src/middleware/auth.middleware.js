import authService from '../services/auth.service.js';
import User from '../models/user.model.js';

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authorization token missing');
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = authService.verifyToken(token);

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

export default auth;