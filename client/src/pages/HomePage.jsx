import { useState } from 'react';
import FriendList from '../components/friends/FriendList.jsx';
import FriendRequestList from '../components/friends/FriendRequestList.jsx';
import SearchBar from '../components/friends/SearchBar.jsx';
import Tab from '../components/ui/Tab.jsx';
import { useChat } from '../context';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('friends');
  const { isManageMode } = useChat();

  const tabs = [
    { id: 'friends', label: 'Friends' },
    { id: 'requests', label: 'Requests' },
  ];

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Friends</h1>
      
      {isManageMode && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-3 rounded mb-4">
          Manage mode is active. You can remove friends.
        </div>
      )}
      
      <SearchBar />
      
      <Tab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="mt-4">
        {activeTab === 'friends' ? (
          <FriendList />
        ) : (
          <FriendRequestList />
        )}
      </div>
    </div>
  );
};

export default HomePage;