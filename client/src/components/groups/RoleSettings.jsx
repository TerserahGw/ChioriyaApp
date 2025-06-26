import { useState } from 'react';
import Button from '../ui/Button.jsx';

const RoleSettings = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Owner', permissions: { sendMessages: true, manageMessages: true }, color: '#FFA726' },
    { id: 2, name: 'Admin', permissions: { sendMessages: true, manageMessages: true }, color: '#8B5E3C' },
    { id: 3, name: 'Member', permissions: { sendMessages: true }, color: '#4A5568' },
  ]);
  
  const [newRole, setNewRole] = useState({ name: '', permissions: {}, color: '#000000' });
  
  const handlePermissionChange = (roleId, permission, value) => {
    setRoles(roles.map(role => 
      role.id === roleId 
        ? { ...role, permissions: { ...role.permissions, [permission]: value } } 
        : role
    ));
  };
  
  const handleAddRole = () => {
    if (!newRole.name.trim()) return;
    
    setRoles([...roles, {
      ...newRole,
      id: roles.length + 1
    }]);
    
    setNewRole({ name: '', permissions: {}, color: '#000000' });
  };
  
  const handleDeleteRole = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Roles Settings</h3>
      
      <div className="space-y-4">
        {roles.map(role => (
          <div key={role.id} className="border p-3 rounded">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: role.color }}
                ></div>
                <span className="font-medium">{role.name}</span>
              </div>
              {role.name !== 'Owner' && (
                <button 
                  onClick={() => handleDeleteRole(role.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={role.permissions.sendMessages || false}
                  onChange={(e) => handlePermissionChange(role.id, 'sendMessages', e.target.checked)}
                  className="mr-2"
                />
                Send Messages
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={role.permissions.manageMessages || false}
                  onChange={(e) => handlePermissionChange(role.id, 'manageMessages', e.target.checked)}
                  className="mr-2"
                />
                Manage Messages
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={role.permissions.manageRoles || false}
                  onChange={(e) => handlePermissionChange(role.id, 'manageRoles', e.target.checked)}
                  className="mr-2"
                />
                Manage Roles
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={role.permissions.manageGroup || false}
                  onChange={(e) => handlePermissionChange(role.id, 'manageGroup', e.target.checked)}
                  className="mr-2"
                />
                Manage Group
              </label>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 border rounded">
        <h4 className="font-medium mb-3">Add New Role</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Role Name</label>
            <input
              type="text"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter role name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <input
              type="color"
              value={newRole.color}
              onChange={(e) => setNewRole({ ...newRole, color: e.target.value })}
              className="w-full h-10"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <Button onClick={handleAddRole} variant="outline" className="w-full">
            Add Role
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSettings;