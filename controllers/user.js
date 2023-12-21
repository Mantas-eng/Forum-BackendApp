import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ fullName });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hash,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { email: savedUser.email, id: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: savedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Bad email or password' });
    }

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Bad email or password' });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    return res.status(200).json({ message: 'User logged in successfully', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something happened' });
  }
};

export { registerUser, loginUser };
