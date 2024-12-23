import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/errorhandler.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
     username,
      email,
       password: hashedPassword
       });

  try {
    await newUser.save();
    return res.status(201).json({ message: 'User created' });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const { password: pass, ...rest } = validUser._doc;

    res.status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};