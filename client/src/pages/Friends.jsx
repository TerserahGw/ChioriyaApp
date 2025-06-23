import { useState } from 'react';
import { motion } from 'framer-motion';
import { useChat } from '../context/ChatContext.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';

const Friends = () => {
  const { friends, friendRequests, sendFriendRequest, respondFriendRequest, removeFriend } = useChat();
  const [searchQuery, setSearchQuery] = useState('');
  const [isManageMode, setIsManageMode] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState('friends');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (showSearch === 'friends') {
      const filtered = friends.filter(friend => 
        friend.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.userId.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([
        { _id: '1', userId: 'user123', username: 'John Doe', profilePic: '' },
        { _id: '2', userId: 'user456', username: 'Jane Smith', profilePic: '' },
      ]);
    }
  };

  return (
    <div className="ml-64 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Friends</h1>
        <div className="flex items-center mt-4 space-x-4">
          <button 
            className={`px-4 py-2 rounded-lg ${showSearch === 'friends' ? 'bg-[#8B5E3C] text-white' : 'bg-gray-200'}`}
            onClick={() => setShowSearch('friends')}
          >
            Friends
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${showSearch === 'global' ? 'bg-[#8B5E3C] text-white' : 'bg-gray-200'}`}
            onClick={() => setShowSearch('global')}
          >
            Global Search
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${isManageMode ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setIsManageMode(!isManageMode)}
          >
            {isManageMode ? 'Done' : 'Manage'}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex space-x-2">
          <Input
            type="text"
            placeholder={`Search ${showSearch === 'friends' ? 'friends' : 'users'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Search</Button>
        </form>
      </div>

      <div>
        {showSearch === 'friends' ? (
          <>
            {searchResults.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {searchResults.map(friend => (
                  <motion.div
                    key={friend._id}
                    className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center">
                      <Avatar src={friend.profilePic} alt={friend.username} size="md" className="mr-3" />
                      <div>
                        <div className="font-semibold">{friend.username}</div>
                        <div className="text-xs text-gray-500">{friend.userId}</div>
                      </div>
                    </div>
                    {isManageMode && (
                      <button 
                        onClick={() => removeFriend(friend._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No friends found</p>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map(user => (
                <motion.div
                  key={user._id}
                  className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center">
                    <Avatar src={user.profilePic} alt={user.username} size="md" className="mr-3" />
                    <div>
                      <div className="font-semibold">{user.username}</div>
                      <div className="text-xs text-gray-500">{user.userId}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => sendFriendRequest(user._id)}
                    className="text-[#8B5E3C] hover:text-[#6F4A2F]"
                  >
                    Add Friend
                  </button>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Friend Requests</h2>
        {friendRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    variant="outline" 
                    className="flex-1"
                    onClick={() => respondFriendRequest(request._id, 'rejected')}
                  >
                    Reject
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500">No friend requests</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;