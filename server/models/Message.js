import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isGroupMessage: { type: Boolean, default: false },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;