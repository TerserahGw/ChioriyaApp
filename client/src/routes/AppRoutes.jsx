import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import AuthPage from '../pages/AuthPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import DashPage from '../pages/DashPage.jsx';
import ChatPage from '../pages/ChatPage.jsx';
import GroupPage from '../pages/GroupPage.jsx';
import CreateGroupPage from '../pages/CreateGroupPage.jsx';

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/home" />} />
      <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
      <Route path="/home" element={user ? <HomePage /> : <Navigate to="/auth" />} />
      <Route path="/dash" element={user ? <DashPage /> : <Navigate to="/auth" />} />
      <Route path="/chat/:chatId" element={user ? <ChatPage /> : <Navigate to="/auth" />} />
      <Route path="/group/:groupId" element={user ? <GroupPage /> : <Navigate to="/auth" />} />
      <Route path="/group/create" element={user ? <CreateGroupPage /> : <Navigate to="/auth" />} />
      <Route path="*" element={<Navigate to={user ? "/home" : "/auth"} />} />
    </Routes>
  );
}

export default AppRoutes;