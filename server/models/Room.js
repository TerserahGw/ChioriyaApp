import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  type: { type: String, enum: ['public', 'private'], default: 'public' },
  allowedRoles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

export default Room;