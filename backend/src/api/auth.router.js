import express from 'express';
import authService from '../services/auth.service.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await authService.register(email, password);
    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
     if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const { user, token } = await authService.login(email, password);
    res.json({ message: 'Login successful', userId: user._id, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

export default router;