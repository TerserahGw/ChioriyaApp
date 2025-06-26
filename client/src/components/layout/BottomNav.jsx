import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useChat } from '../../context';
import { FiHome, FiUsers, FiUser, FiPlusCircle, FiSearch } from 'react-icons/fi';

const BottomNav = () => {
  const { pathname } = useLocation();
  const { isManageMode, setIsManageMode } = useChat();
  
  const navItems = [
    { path: '/home', icon: <FiHome size={24} />, label: 'Home' },
    { path: '/friends', icon: <FiUsers size={24} />, label: 'Friends' },
    { path: '/dash', icon: <FiUser size={24} />, label: 'Profile' },
  ];

  return (
    <motion.div 
      className="bg-white border-t md:hidden fixed bottom-0 left-0 right-0"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-around items-center p-2">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`flex flex-col items-center p-2 ${pathname === item.path ? 'text-primary' : 'text-gray-500'}`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
        
        <button 
          onClick={() => setIsManageMode(!isManageMode)}
          className={`flex flex-col items-center p-2 ${isManageMode ? 'text-red-500' : 'text-gray-500'}`}
        >
          <FiPlusCircle size={24} />
          <span className="text-xs mt-1">Manage</span>
        </button>
        
        <button className="flex flex-col items-center p-2 text-gray-500">
          <FiSearch size={24} />
          <span className="text-xs mt-1">Search</span>
        </button>
      </div>
    </motion.div>
  );
};

export default BottomNav;