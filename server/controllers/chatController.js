import Message from '../models/Message.js';
import User from '../models/User.js';
import Group from '../models/Group.js';
import Room from '../models/Room.js';

export const sendMessage = async (req, res) => {
  const { content, roomId, groupId, receiverId } = req.body;
  const sender = req.user;

  let message;
  if (groupId) {
    const group = await Group.findById(groupId);
    if (!group) {
      res.status(404);
      throw new Error('Group not found');
    }

    const isMember = group.members.some(member => member.user.toString() === sender._id.toString());
    if (!isMember) {
      res.status(401);
      throw new Error('Not a member of the group');
    }

    if (roomId) {
      const room = await Room.findById(roomId);
      if (!room) {
        res.status(404);
        throw new Error('Room not found');
      }

      if (room.type === 'private') {
        const userRole = group.members.find(member => member.user.toString() === sender._id.toString()).role;
        if (!room.allowedRoles.includes(userRole)) {
          res.status(403);
          throw new Error('Not authorized to send message in this room');
        }
      }
    }

    message = new Message({
      content,
      sender: sender._id,
      room: roomId,
      group: groupId,
      isGroupMessage: true,
    });
  } else if (receiverId) {
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      res.status(404);
      throw new Error('User not found');
    }

    const isFriend = receiver.friends.includes(sender._id);
    if (!isFriend) {
      res.status(403);
      throw new Error('Not friends');
    }

    message = new Message({
      content,
      sender: sender._id,
      receiver: receiver._id,
    });
  } else {
    res.status(400);
    throw new Error('Invalid message parameters');
  }

  const savedMessage = await message.save();
  res.status(201).json(savedMessage);
};

export const getMessages = async (req, res) => {
  const { groupId, roomId, receiverId } = req.query;
  const user = req.user;

  let messages;
  if (groupId) {
    const group = await Group.findById(groupId);
    if (!group) {
      res.status(404);
      throw new Error('Group not found');
    }

    const isMember = group.members.some(member => member.user.toString() === user._id.toString());
    if (!isMember) {
      res.status(401);
      throw new Error('Not a member of the group');
    }

    let query = { group: groupId };
    if (roomId) {
      const room = await Room.findById(roomId);
      if (!room) {
        res.status(404);
        throw new Error('Room not found');
      }

      if (room.type === 'private') {
        const userRole = group.members.find(member => member.user.toString() === user._id.toString()).role;
        if (!room.allowedRoles.includes(userRole)) {
          res.status(403);
          throw new Error('Not authorized to view messages in this room');
        }
      }
      query.room = roomId;
    }

    messages = await Message.find(query).populate('sender', 'userId username profilePic').sort({ createdAt: 1 });
  } else if (receiverId) {
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      res.status(404);
      throw new Error('User not found');
    }

    const isFriend = receiver.friends.includes(user._id);
    if (!isFriend) {
      res.status(403);
      throw new Error('Not friends');
    }

    messages = await Message.find({
      $or: [
        { sender: user._id, receiver: receiverId },
        { sender: receiverId, receiver: user._id }
      ]
    }).populate('sender', 'userId username profilePic').sort({ createdAt: 1 });
  } else {
    res.status(400);
    throw new Error('Invalid parameters');
  }

  res.json(messages);
};