import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Avatar from '../ui/Avatar.jsx';
import { useChat } from '../../context';
import { FiSettings } from 'react-icons/fi';

const ChatHeader = () => {
  const { activeChat } = useChat();
  const navigate = useNavigate();

  if (!activeChat) return null;

  return (
    <motion.div 
      className="bg-white p-4 border-b flex items-center justify-between"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex items-center">
        <Avatar src={activeChat.profilePic} alt={activeChat.name} size="md" className="mr-3" />
        <div>
          <h2 className="font-semibold">{activeChat.name}</h2>
          <p className="text-xs text-gray-500">
            {activeChat.isGroup 
              ? `${activeChat.members?.length || 0} members` 
              : 'Online'}
          </p>
        </div>
      </div>
      
      {activeChat.isGroup && (
        <button 
          onClick={() => navigate(`/group/${activeChat.id}`)}
          className="text-primary hover:text-primary-dark"
        >
          <FiSettings size={24} />
        </button>
      )}
    </motion.div>
  );
};

export default ChatHeader;