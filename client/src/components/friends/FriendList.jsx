import { motion } from 'framer-motion';
import FriendItem from './FriendItem.jsx';
import { useChat } from '../../context';

const FriendList = () => {
  const { friends, isManageMode } = useChat();

  if (friends.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No friends yet. Start adding friends!</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {friends.map(friend => (
        <FriendItem 
          key={friend._id} 
          friend={friend} 
          isManageMode={isManageMode} 
        />
      ))}
    </motion.div>
  );
};

export default FriendList;