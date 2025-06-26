import { motion } from 'framer-motion';
import { useAuth } from '../../context';
import Avatar from '../ui/Avatar.jsx';
import { format } from 'date-fns';

const MessageItem = ({ message, isSelf }) => {
  const { user } = useAuth();
  
  // Determine message type based on room or group settings
  let messageType = 'normal';
  if (message.room?.type === 'announcement') {
    messageType = 'announcement';
  } else if (message.room?.type === 'admin') {
    messageType = 'admin';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isSelf ? 'justify-end' : 'justify-start'} mb-4`}
    >
      {!isSelf && (
        <div className="mr-2">
          <Avatar src={message.sender.profilePic} alt={message.sender.username} size="sm" />
        </div>
      )}
      
      <div className={`message-bubble ${isSelf ? 'self' : 'other'} ${messageType}`}>
        {message.isGroupMessage && !isSelf && (
          <div 
            className="font-semibold text-xs mb-1" 
            style={{ color: message.sender.role?.color || '#000' }}
          >
            {message.sender.username}
          </div>
        )}
        
        <div className="text-wrap">{message.content}</div>
        
        <div className="text-xs text-gray-500 mt-1">
          {format(new Date(message.createdAt), 'HH:mm')}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageItem;