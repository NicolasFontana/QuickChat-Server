import bcrypt from 'bcrypt';
import User from '../models/Users';

const createUser = async (req, res) => {
  try {
    const {
      username, email, password, avatarImage,
    } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.status(409).json({
        message: 'Username already exist',
        data: null,
        error: true,
      });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(409).json({
        message: 'Email already exist',
        data: null,
        error: true,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      avatarImage,
    });
    user.password = undefined;
    delete user.password;
    return res.status(201).json({
      message: 'User created',
      data: user,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: null,
      error: true,
    });
  }
};

const getUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: 'Incorrect username or password',
      data: null,
      error: true,
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: 'Incorrect username or password',
      data: null,
      error: true,
    });
  }
  user.password = undefined;
  delete user.password;
  return res.status(200).json({
    message: 'Login success',
    data: user,
    error: false,
  });
};

const setAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: null,
        error: true,
      });
    }
    const { avatarImage } = req.body;
    const userUpdated = await User.findByIdAndUpdate(
      id,
      { avatarImage },
      { new: true },
    );
    if (!userUpdated) {
      return res.status(404).json({
        message: 'The user has not been found',
        data: null,
        error: true,
      });
    }
    userUpdated.password = undefined;
    delete userUpdated.password;
    return res.status(200).json({
      message: 'The user has been updated successfully',
      data: userUpdated,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: null,
      error: true,
    });
  }
};

export default {
  createUser,
  getUser,
  setAvatar,
};
