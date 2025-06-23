import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  permissions: {
    sendMessages: { type: Boolean, default: true },
    manageMessages: { type: Boolean, default: false },
    manageRoles: { type: Boolean, default: false },
    manageRooms: { type: Boolean, default: false },
    manageGroup: { type: Boolean, default: false },
    accessRooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }]
  },
  color: { type: String, default: '#000000' },
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);

export default Role;