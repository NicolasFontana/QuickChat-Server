import User from '../models/Users';

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

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      'email',
      'username',
      'avatarImage',
      '_id',
    ]);
    res.status(200).json({
      message: 'Users found',
      data: users,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
      error: true,
    });
  }
};

export default {
  setAvatar,
  getAllUsers,
};
