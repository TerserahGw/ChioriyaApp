import { useState } from 'react';
import Button from '../ui/Button.jsx';

const RoomSettings = () => {
  const [rooms, setRooms] = useState([
    { id: 1, name: 'General', type: 'public', roles: [] },
    { id: 2, name: 'Admin', type: 'private', roles: [1, 2] },
  ]);
  
  const [newRoom, setNewRoom] = useState({ name: '', type: 'public', roles: [] });
  
  const handleAddRoom = () => {
    if (!newRoom.name.trim()) return;
    
    setRooms([...rooms, {
      ...newRoom,
      id: rooms.length + 1
    }]);
    
    setNewRoom({ name: '', type: 'public', roles: [] });
  };
  
  const handleDeleteRoom = (id) => {
    setRooms(rooms.filter(room => room.id !== id));
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Rooms Settings</h3>
      
      <div className="space-y-3">
        {rooms.map(room => (
          <div key={room.id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <div className="font-medium">{room.name}</div>
              <div className="text-sm text-gray-500 capitalize">{room.type}</div>
            </div>
            {room.name !== 'General' && room.name !== 'Admin' && (
              <button 
                onClick={() => handleDeleteRoom(room.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 border rounded">
        <h4 className="font-medium mb-3">Add New Room</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Room Name</label>
            <input
              type="text"
              value={newRoom.name}
              onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter room name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Room Type</label>
            <select
              value={newRoom.type}
              onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="announcement">Announcement</option>
              <option value="admin">Admin Only</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <Button onClick={handleAddRoom} variant="outline" className="w-full">
            Add Room
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomSettings;