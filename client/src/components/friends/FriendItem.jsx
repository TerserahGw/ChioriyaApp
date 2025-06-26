import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Avatar from '../ui/Avatar.jsx';
import { useChat } from '../../context';

const FriendItem = ({ friend, isManageMode }) => {
  const { removeFriend } = useChat();

  return (
    <motion.div 
      className="flex items-center justify-between p-2 bg-white rounded shadow-sm"
      whileHover={{ scale: 1.02 }}
    >
      <Link to={`/chat/${friend._id}`} className="flex items-center flex-1">
        <Avatar src={friend.profilePic} alt={friend.username} size="md" className="mr-3" />
        <div>
          <div className="font-semibold">{friend.username}</div>
          <div className="text-xs text-gray-500">{friend.userId}</div>
        </div>
      </Link>
      
      {isManageMode && (
        <button 
          onClick={() => removeFriend(friend._id)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      )}
    </motion.div>
  );
};

export default FriendItem;