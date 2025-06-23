import { motion } from 'framer-motion';
import Avatar from '../ui/Avatar.jsx';

const ChatHeader = ({ chat }) => {
  if (!chat) return null;

  return (
    <motion.div 
      className="bg-white p-4 border-b flex items-center"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <Avatar src={chat.profilePic} alt={chat.name} size="md" className="mr-3" />
      <div>
        <h2 className="font-semibold">{chat.name}</h2>
        <p className="text-xs text-gray-500">{chat.isGroup ? `${chat.members.length} members` : 'Online'}</p>
      </div>
    </motion.div>
  );
};

export default ChatHeader;