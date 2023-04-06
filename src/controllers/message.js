import Message from '../models/Messages';
import User from '../models/Users';

const addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const sender = await User.findById({ _id: from });
    const receiver = await User.findById({ _id: to });
    if (!sender || !receiver) {
      return res.status(404).json('error');
    }
    const newMessage = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (newMessage) {
      return res.status(201).json({
        message: 'Message saved',
        data: newMessage,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Failed to save message',
      data: null,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: null,
      error: true,
    });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const { from, to } = req.body;
    const messages = await Message
      .find({ users: { $all: [from, to] } });
    const projectMessages = messages.map((msg) => ({
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
    }));
    return res.status(200).json({
      message: 'found messages',
      data: projectMessages,
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
  addMessage,
  getAllMessages,
};
