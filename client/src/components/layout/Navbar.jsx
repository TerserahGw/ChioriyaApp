import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Avatar from '../ui/Avatar.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.nav 
      className="bg-primary text-white p-4 shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Chioriya Chat</Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dash" className="flex items-center space-x-2">
                <Avatar src={user.profilePic} alt={user.username} size="sm" />
                <span>{user.username}</span>
              </Link>
              <button 
                onClick={logout} 
                className="bg-accent hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="bg-accent hover:bg-orange-600 px-4 py-2 rounded-lg">Login</Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;