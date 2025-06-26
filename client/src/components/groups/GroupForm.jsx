import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import { useChat } from '../../context';

const GroupForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [groupType, setGroupType] = useState('Social');
  const [error, setError] = useState('');
  const { createGroup } = useChat();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Group name is required');
      return;
    }

    try {
      await createGroup({
        name,
        description,
        groupType
      });
      navigate('/home');
    } catch (err) {
      setError('Failed to create group');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
      
      <Input
        label="Group Name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      
      <Input
        label="Description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      
      <div className="mb-4">
        <label htmlFor="groupType" className="block text-sm font-medium text-gray-700 mb-1">
          Group Type
        </label>
        <select
          id="groupType"
          value={groupType}
          onChange={(e) => setGroupType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        >
          <option value="Gaming">Gaming</option>
          <option value="Social">Social</option>
          <option value="Mystery">Mystery</option>
          <option value="Political">Political</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">Create Group</Button>
      </div>
    </form>
  );
};

export default GroupForm;