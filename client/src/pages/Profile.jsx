import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import Avatar from '../components/ui/Avatar.jsx';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    profilePic: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        password: '',
        confirmPassword: '',
        bio: user.bio || '',
        profilePic: user.profilePic || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await updateProfile(
        formData.username,
        formData.email,
        formData.password,
        formData.bio,
        formData.profilePic
      );
      setSuccess('Profile updated successfully');
      setError('');
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  return (
    <div className="ml-64 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

        {error && <div className="mb-4 text-red-500">{error}</div>}
        {success && <div className="mb-4 text-green-500">{success}</div>}

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Avatar src={formData.profilePic} alt={formData.username} size="xl" />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{formData.username}</h2>
              <p className="text-gray-600">{user?.userId}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Input
              label="Username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Bio"
              id="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
            />
            <Input
              label="Profile Picture URL"
              id="profilePic"
              value={formData.profilePic}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
            />
            <Input
              label="New Password"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
            />
            <Input
              label="Confirm New Password"
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
            <div className="mt-6">
              <Button type="submit" className="w-full">Update Profile</Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;