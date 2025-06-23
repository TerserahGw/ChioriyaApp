import Group from '../models/Group.js';
import User from '../models/User.js';
import Role from '../models/Role.js';
import Room from '../models/Room.js';
import { generateUniqueId } from '../utils/generateUniqueId.js';

export const createGroup = async (req, res) => {
  const { name, description, groupType } = req.body;
  const owner = req.user;

  const groupId = generateUniqueId();
  const group = new Group({
    groupId,
    name,
    description,
    groupType,
    owner: owner._id,
  });

  const ownerRole = new Role({
    name: 'Owner',
    group: group._id,
    permissions: {
      sendMessages: true,
      manageMessages: true,
      manageRoles: true,
      manageRooms: true,
      manageGroup: true,
    },
    color: '#FFA726',
  });

  const memberRole = new Role({
    name: 'Member',
    group: group._id,
    permissions: {
      sendMessages: true,
    },
    color: '#8B5E3C',
  });

  await ownerRole.save();
  await memberRole.save();

  const generalRoom = new Room({
    name: 'General',
    group: group._id,
    type: 'public',
  });

  const adminRoom = new Room({
    name: 'Admin',
    group: group._id,
    type: 'private',
    allowedRoles: [ownerRole._id],
  });

  await generalRoom.save();
  await adminRoom.save();

  group.rooms = [generalRoom._id, adminRoom._id];
  group.members.push({ user: owner._id, role: ownerRole._id });

  await group.save();

  await User.findByIdAndUpdate(owner._id, { $addToSet: { groups: group._id } });

  res.status(201).json(group);
};

export const getGroupById = async (req, res) => {
  const group = await Group.findById(req.params.id)
    .populate('owner', 'userId username')
    .populate({
      path: 'members.user',
      select: 'userId username profilePic',
    })
    .populate('rooms');
  if (group) {
    res.json(group);
  } else {
    res.status(404);
    throw new Error('Group not found');
  }
};

export const updateGroup = async (req, res) => {
  const { name, description, groupType, profilePic } = req.body;
  const group = await Group.findById(req.params.id);

  if (!group) {
    res.status(404);
    throw new Error('Group not found');
  }

  if (group.owner.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  group.name = name || group.name;
  group.description = description || group.description;
  group.groupType = groupType || group.groupType;
  group.profilePic = profilePic || group.profilePic;

  const updatedGroup = await group.save();
  res.json(updatedGroup);
};

export const joinGroup = async (req, res) => {
  const { groupId } = req.body;
  const user = req.user;

  const group = await Group.findOne({ groupId });
  if (!group) {
    res.status(404);
    throw new Error('Group not found');
  }

  const isMember = group.members.some(member => member.user.toString() === user._id.toString());
  if (isMember) {
    res.status(400);
    throw new Error('Already a member');
  }

  const memberRole = await Role.findOne({ group: group._id, name: 'Member' });
  if (!memberRole) {
    res.status(404);
    throw new Error('Default member role not found');
  }

  group.members.push({ user: user._id, role: memberRole._id });
  await group.save();

  await User.findByIdAndUpdate(user._id, { $addToSet: { groups: group._id } });

  res.status(201).json(group);
};

export const getGroupRoles = async (req, res) => {
  const groupId = req.params.groupId;
  const roles = await Role.find({ group: groupId });
  res.json(roles);
};

export const createRole = async (req, res) => {
  const groupId = req.params.groupId;
  const { name, permissions, color } = req.body;

  const role = new Role({
    name,
    group: groupId,
    permissions,
    color,
  });

  await role.save();
  res.status(201).json(role);
};

export const updateRole = async (req, res) => {
  const { roleId } = req.params;
  const { name, permissions, color } = req.body;

  const role = await Role.findById(roleId);
  if (!role) {
    res.status(404);
    throw new Error('Role not found');
  }

  role.name = name || role.name;
  role.permissions = permissions || role.permissions;
  role.color = color || role.color;

  const updatedRole = await role.save();
  res.json(updatedRole);
};

export const deleteRole = async (req, res) => {
  const { roleId } = req.params;

  const role = await Role.findById(roleId);
  if (!role) {
    res.status(404);
    throw new Error('Role not found');
  }

  if (role.name === 'Owner' || role.name === 'Member') {
    res.status(400);
    throw new Error('Cannot delete default role');
  }

  await Role.findByIdAndDelete(roleId);
  res.json({ message: 'Role deleted' });
};

export const createRoom = async (req, res) => {
  const groupId = req.params.groupId;
  const { name, type, allowedRoles } = req.body;

  const room = new Room({
    name,
    group: groupId,
    type,
    allowedRoles,
  });

  await room.save();

  await Group.findByIdAndUpdate(groupId, { $addToSet: { rooms: room._id } });

  res.status(201).json(room);
};

export const updateRoom = async (req, res) => {
  const { roomId } = req.params;
  const { name, type, allowedRoles } = req.body;

  const room = await Room.findById(roomId);
  if (!room) {
    res.status(404);
    throw new Error('Room not found');
  }

  room.name = name || room.name;
  room.type = type || room.type;
  room.allowedRoles = allowedRoles || room.allowedRoles;

  const updatedRoom = await room.save();
  res.json(updatedRoom);
};

export const deleteRoom = async (req, res) => {
  const { roomId } = req.params;

  const room = await Room.findById(roomId);
  if (!room) {
    res.status(404);
    throw new Error('Room not found');
  }

  if (room.name === 'General' || room.name === 'Admin') {
    res.status(400);
    throw new Error('Cannot delete default room');
  }

  await Room.findByIdAndDelete(roomId);
  res.json({ message: 'Room deleted' });
};