import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/ui/Button.jsx';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="ml-64 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-6">Welcome to Chioriya Chat</h1>
        
        {user ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/friends">
                <motion.div 
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-[#8B5E3C] transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-medium mb-2">Chat with Friends</h3>
                  <p className="text-gray-600">Start a conversation with your friends</p>
                </motion.div>
              </Link>
              <Link to="/group">
                <motion.div 
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-[#8B5E3C] transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-medium mb-2">Join a Group</h3>
                  <p className="text-gray-600">Connect with people in groups</p>
                </motion.div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Join the Community</h2>
            <p className="mb-6 text-gray-600">Sign up or log in to start chatting with friends and groups</p>
            <div className="flex justify-center space-x-4">
              <Link to="/login">
                <Button variant="primary">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary">Register</Button>
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Home;