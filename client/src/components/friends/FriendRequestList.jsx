import { motion } from 'framer-motion';
import { useChat } from '../../context';
import Button from '../ui/Button.jsx';
import Avatar from '../ui/Avatar.jsx';

const FriendRequestList = () => {
  const { friendRequests, respondFriendRequest } = useChat();

  if (friendRequests.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No friend requests</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {friendRequests.map(request => (
        <motion.div
          key={request._id}
          className="bg-white p-4 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center mb-3">
            <Avatar src={request.sender.profilePic} alt={request.sender.username} size="md" className="mr-3" />
            <div>
              <div className="font-semibold">{request.sender.username}</div>
              <div className="text-xs text-gray-500">{request.sender.userId}</div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="primary" 
              className="flex-1"
              onClick={() => respondFriendRequest(request._id, 'accepted')}
            >
              Accept
            </Button>
            <Button 
              variant="danger" 
              className="flex-1"
              onClick={() => respondFriendRequest(request._id, 'rejected')}
            >
              Reject
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FriendRequestList;