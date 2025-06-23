import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  groupId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  groupType: { type: String, enum: ['Gaming', 'Social', 'Mystery', 'Political', 'Other'], default: 'Social' },
  profilePic: { type: String, default: '' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }
  }],
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);

export default Group;