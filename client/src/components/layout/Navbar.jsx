import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Avatar from '../ui/Avatar.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.nav 
      className="bg-[#8B5E3C] text-white p-4 shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Chioriya Chat</Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/friends" className="hover:underline">Friends</Link>
              <Link to="/profile" className="flex items-center space-x-2">
                <Avatar src={user.profilePic} alt={user.username} size="sm" />
                <span>{user.username}</span>
              </Link>
              <button 
                onClick={logout} 
                className="bg-[#FFA726] hover:bg-[#E5941D] px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="bg-[#FFA726] hover:bg-[#E5941D] px-4 py-2 rounded-lg">Register</Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;