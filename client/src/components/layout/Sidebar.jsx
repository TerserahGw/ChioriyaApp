import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useChat } from '../../context/ChatContext.jsx';
import Button from '../ui/Button.jsx';
import Avatar from '../ui/Avatar.jsx';

const Sidebar = () => {
  const { groups } = useChat();
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupType, setGroupType] = useState('Social');
  const [joinCode, setJoinCode] = useState('');

  const handleCreateGroup = async () => {
    setShowCreateGroup(false);
    setGroupName('');
    setGroupType('Social');
  };

  const handleJoinGroup = async () => {
    setJoinCode('');
  };

  return (
    <motion.div 
      className="w-64 bg-white shadow-md h-screen fixed left-0 top-0 pt-16"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 border-b">
        <Link to="/friends" className="block py-2 px-4 rounded hover:bg-gray-100">Friends</Link>
      </div>
      <div className="p-4">
        <h2 className="font-semibold mb-2">Groups</h2>
        <div className="space-y-2">
          {groups.map(group => (
            <Link 
              key={group._id} 
              to={`/group/${group._id}`}
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100"
            >
              <Avatar src={group.profilePic} alt={group.name} size="sm" />
              <span>{group.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
        <Button 
          variant="primary" 
          className="w-full mb-2"
          onClick={() => setShowCreateGroup(true)}
        >
          Create Group
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => document.getElementById('join-group-modal').showModal()}
        >
          Join Group
        </Button>
      </div>

      {showCreateGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div 
            className="bg-white p-6 rounded-lg w-96"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Create Group</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Group Name</label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Group Type</label>
              <select
                value={groupType}
                onChange={(e) => setGroupType(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="Gaming">Gaming</option>
                <option value="Social">Social</option>
                <option value="Mystery">Mystery</option>
                <option value="Political">Political</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="ghost" onClick={() => setShowCreateGroup(false)}>Cancel</Button>
              <Button onClick={handleCreateGroup}>Create</Button>
            </div>
          </motion.div>
        </div>
      )}

      <dialog id="join-group-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Join Group</h3>
          <p className="py-4">Enter the group code to join</p>
          <input
            type="text"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            className="w-full px-3 py-2 border rounded-md mb-4"
            placeholder="Group Code"
          />
          <div className="modal-action">
            <form method="dialog">
              <Button variant="ghost" className="mr-2">Cancel</Button>
              <Button onClick={handleJoinGroup}>Join</Button>
            </form>
          </div>
        </div>
      </dialog>
    </motion.div>
  );
};

export default Sidebar;