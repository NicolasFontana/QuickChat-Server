import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
    },
    users: { type: Array },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Message', messageSchema);
