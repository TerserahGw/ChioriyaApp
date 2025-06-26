import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Avatar from '../ui/Avatar.jsx';

const GroupItem = ({ group }) => {
  return (
    <motion.div 
      className="flex items-center p-2 bg-white rounded shadow-sm"
      whileHover={{ scale: 1.02 }}
    >
      <Link to={`/group/${group._id}`} className="flex items-center flex-1">
        <Avatar src={group.profilePic} alt={group.name} size="md" className="mr-3" />
        <div>
          <div className="font-semibold">{group.name}</div>
          <div className="text-xs text-gray-500">{group.description}</div>
        </div>
      </Link>
    </motion.div>
  );
};

export default GroupItem;