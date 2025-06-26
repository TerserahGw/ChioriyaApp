import { motion } from 'framer-motion';
import GroupItem from './GroupItem.jsx';
import { useChat } from '../../context';

const GroupList = () => {
  const { groups } = useChat();

  if (groups.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No groups yet. Create or join a group!</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {groups.map(group => (
        <GroupItem key={group._id} group={group} />
      ))}
    </motion.div>
  );
};

export default GroupList;