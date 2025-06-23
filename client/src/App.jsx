import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';
import { ChatProvider } from './context/ChatContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import Navbar from './components/layout/Navbar.jsx';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <ChatProvider>
          <Router>
            <Navbar />
            <div className="pt-16">
              <AppRoutes />
            </div>
          </Router>
        </ChatProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
