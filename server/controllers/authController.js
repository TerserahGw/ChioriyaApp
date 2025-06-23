import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { generateUniqueId } from '../utils/generateUniqueId.js';

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const userId = generateUniqueId();
  const user = await User.create({
    userId,
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      userId: user.userId,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      userId: user.userId,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      bio: user.bio,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      userId: user.userId,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      bio: user.bio,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.profilePic = req.body.profilePic || user.profilePic;
    user.bio = req.body.bio || user.bio;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      userId: updatedUser.userId,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
      bio: updatedUser.bio,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};
