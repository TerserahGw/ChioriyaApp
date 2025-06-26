import { useState } from 'react';
import { useChat } from '../../context';
import Input from '../ui/Input.jsx';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('friends');
  const { friends } = useChat();

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery, 'in', searchType);
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="flex items-center mb-2">
        <button 
          type="button"
          className={`px-4 py-2 rounded-l-lg ${searchType === 'friends' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          onClick={() => setSearchType('friends')}
        >
          Friends
        </button>
        <button 
          type="button"
          className={`px-4 py-2 rounded-r-lg ${searchType === 'global' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          onClick={() => setSearchType('global')}
        >
          Global
        </button>
      </div>
      <div className="flex">
        <Input
          type="text"
          placeholder={`Search ${searchType === 'friends' ? 'friends' : 'users'}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 rounded-r-none"
        />
        <button 
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary-dark"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;