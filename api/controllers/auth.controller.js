import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Please fill in all fields' });
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
    return res.status(400).json({ message: error.message });
  }
}