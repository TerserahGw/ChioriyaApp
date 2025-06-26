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
            <div className="flex h-screen">
              <LeftSidebar />
              <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="flex-1 overflow-hidden">
                  <AppRoutes />
                </div>
                <BottomNav />
              </div>
              <RightSidebar />
            </div>
          </Router>
        </ChatProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;