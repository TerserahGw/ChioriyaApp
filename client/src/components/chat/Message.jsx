import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext.jsx';
import Avatar from '../ui/Avatar.jsx';

const Message = ({ message }) => {
  const { user } = useAuth();
  const isMe = message.sender._id === user._id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4`}
    >
      {!isMe && (
        <div className="mr-2">
          <Avatar src={message.sender.profilePic} alt={message.sender.username} size="sm" />
        </div>
      )}
      <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${isMe ? 'bg-[#FFA726] text-white' : 'bg-gray-200'}`}>
        {message.isGroupMessage && !isMe && (
          <div className="font-semibold text-xs text-gray-700">{message.sender.username}</div>
        )}
        <div>{message.content}</div>
      </div>
    </motion.div>
  );
};

export default Message;