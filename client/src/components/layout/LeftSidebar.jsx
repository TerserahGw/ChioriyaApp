import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth, useChat } from '../../context';
import Avatar from '../ui/Avatar.jsx';
import Button from '../ui/Button.jsx';
import GroupList from '../groups/GroupList.jsx';

const LeftSidebar = () => {
  const { user } = useAuth();
  const { joinGroup } = useChat();
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  const handleJoinGroup = async () => {
    if (joinCode.trim()) {
      await joinGroup(joinCode);
      setJoinCode('');
    }
  };

  if (!user) return null;

  return (
    <motion.div 
      className="w-64 bg-white shadow-md h-full fixed left-0 top-0 pt-16 hidden md:block"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 border-b">
        <Link to="/home" className="block py-2 px-4 rounded hover:bg-gray-100 font-medium">
          Home
        </Link>
      </div>
      
      <div className="p-4">
        <h2 className="font-semibold mb-2">Groups</h2>
        <GroupList />
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
          onClick={() => document.getElementById('join-modal').showModal()}
        >
          Join Group
        </Button>
      </div>
      
      {/* Join Group Modal */}
      <dialog id="join-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Join Group</h3>
          <p className="py-2">Enter group code to join</p>
          <input
            type="text"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            className="w-full p-2 border rounded mb-4"
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
      
      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div 
            className="bg-white p-6 rounded-lg w-96"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Create Group</h3>
            <div className="mb-4">
              <Link to="/group/create" className="block w-full bg-primary text-white text-center py-2 rounded">
                Create New Group
              </Link>
            </div>
            <div className="flex justify-end">
              <Button variant="ghost" onClick={() => setShowCreateGroup(false)}>Close</Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default LeftSidebar;