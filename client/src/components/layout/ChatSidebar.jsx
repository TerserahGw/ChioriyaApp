import { motion } from 'framer-motion';
import { useState } from 'react';
import Avatar from '../ui/Avatar.jsx';

const ChatSidebar = ({ group }) => {
  const [activeTab, setActiveTab] = useState('rooms');
  const [showSidebar, setShowSidebar] = useState(true);

  if (!group || !showSidebar) return null;

  return (
    <motion.div 
      className="w-64 bg-white shadow-md h-screen fixed right-0 top-0 pt-16"
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <div className="flex items-center space-x-2">
          <Avatar src={group.profilePic} alt={group.name} size="sm" />
          <h2 className="font-semibold">{group.name}</h2>
        </div>
        <button onClick={() => setShowSidebar(false)} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
      <div className="tabs tabs-boxed p-2">
        <button 
          className={`tab ${activeTab === 'rooms' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('rooms')}
        >
          Rooms
        </button>
        <button 
          className={`tab ${activeTab === 'members' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          Members
        </button>
      </div>
      <div className="p-4">
        {activeTab === 'rooms' ? (
          <div>
            <h3 className="font-medium mb-2">Rooms</h3>
            <ul>
              {group.rooms.map(room => (
                <li key={room._id} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                  {room.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h3 className="font-medium mb-2">Members</h3>
            <ul>
              {group.members.map(member => (
                <li key={member.user._id} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                  <Avatar src={member.user.profilePic} alt={member.user.username} size="sm" />
                  <span>{member.user.username}</span>
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: member.role.color }}>
                    {member.role.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatSidebar;