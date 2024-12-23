import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/errorhandler.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return next(errorHandler(400, 'All fields are required'));
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

export const login = async (req, res, next) => {
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

export const google = async (req, res, next) => {
  const { googlePhotoUrl, name, email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const { password: pass, ...rest } = user._doc;
      return res.status(200).cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
      }).json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-5),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const { password: pass, ...rest } = newUser._doc;
      return res.status(201).cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
      }).json(rest);
    }
  } catch (error) {
    next(error);
  }
};