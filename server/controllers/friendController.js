import User from '../models/User.js';
import FriendRequest from '../models/FriendRequest.js';

export const searchUsers = async (req, res) => {
  const { query } = req.query;
  const users = await User.find({
    $or: [
      { username: { $regex: query, $options: 'i' } },
      { userId: { $regex: query, $options: 'i' } }
    ]
  }).select('userId username profilePic');
  res.json(users);
};

export const sendFriendRequest = async (req, res) => {
  const { receiverId } = req.body;
  const sender = req.user;
  const receiver = await User.findOne({ userId: receiverId });

  if (!receiver) {
    res.status(404);
    throw new Error('User not found');
  }

  const existingRequest = await FriendRequest.findOne({
    sender: sender._id,
    receiver: receiver._id,
  });

  if (existingRequest) {
    res.status(400);
    throw new Error('Friend request already sent');
  }

  const friendRequest = new FriendRequest({
    sender: sender._id,
    receiver: receiver._id,
  });

  await friendRequest.save();
  res.status(201).json(friendRequest);
};

export const getFriendRequests = async (req, res) => {
  const userId = req.user._id;
  const requests = await FriendRequest.find({ receiver: userId, status: 'pending' }).populate('sender', 'userId username profilePic');
  res.json(requests);
};

export const respondFriendRequest = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  const friendRequest = await FriendRequest.findById(requestId).populate('sender receiver');

  if (!friendRequest) {
    res.status(404);
    throw new Error('Friend request not found');
  }

  if (friendRequest.receiver._id.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  friendRequest.status = status;
  await friendRequest.save();

  if (status === 'accepted') {
    await User.findByIdAndUpdate(friendRequest.sender._id, { $addToSet: { friends: friendRequest.receiver._id } });
    await User.findByIdAndUpdate(friendRequest.receiver._id, { $addToSet: { friends: friendRequest.sender._id } });
  }

  res.json(friendRequest);
};

export const getFriends = async (req, res) => {
  const user = await User.findById(req.user._id).populate('friends', 'userId username profilePic');
  res.json(user.friends);
};

export const removeFriend = async (req, res) => {
  const { friendId } = req.params;
  const user = req.user;

  await User.findByIdAndUpdate(user._id, { $pull: { friends: friendId } });
  await User.findByIdAndUpdate(friendId, { $pull: { friends: user._id } });

  res.json({ message: 'Friend removed' });
};
