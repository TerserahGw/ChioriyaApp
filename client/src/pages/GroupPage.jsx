import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Tab from '../components/ui/Tab.jsx';
import RoleSettings from '../components/groups/RoleSettings.jsx';
import RoomSettings from '../components/groups/RoomSettings.jsx';
import { useChat } from '../context';

const GroupPage = () => {
  const { groupId } = useParams();
  const [activeTab, setActiveTab] = useState('settings');
  const { groups } = useChat();
  
  // Find the group by ID
  const group = groups.find(g => g._id === groupId);
  
  const tabs = [
    { id: 'settings', label: 'Group Settings' },
    { id: 'roles', label: 'Roles' },
    { id: 'rooms', label: 'Rooms' },
  ];

  if (!group) {
    return (
      <div className="p-4 text-center">
        <p>Group not found</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold">{group.name}</h1>
          <span className="ml-3 px-2 py-1 bg-gray-200 rounded text-sm">
            {group.groupType}
          </span>
        </div>
        
        <p className="text-gray-600 mb-6">{group.description}</p>
        
        <Tab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-6">
          {activeTab === 'settings' && (
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Group Settings</h3>
              <p>Edit group name, description, type, etc.</p>
            </div>
          )}
          
          {activeTab === 'roles' && <RoleSettings />}
          {activeTab === 'rooms' && <RoomSettings />}
        </div>
      </motion.div>
    </div>
  );
};

export default GroupPage;