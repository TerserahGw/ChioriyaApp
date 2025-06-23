import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import Login from '../pages/Auth/Login.jsx';
import Register from '../pages/Auth/Register.jsx';
import Friends from '../pages/Friends.jsx';
import Chat from '../pages/Chat.jsx';
import Group from '../pages/Group.jsx';
import Profile from '../pages/Profile.jsx';
import Home from '../pages/Home.jsx';

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
      <Route path="/friends" element={user ? <Friends /> : <Navigate to="/login" />} />
      <Route path="/chat/:chatId" element={user ? <Chat /> : <Navigate to="/login" />} />
      <Route path="/group/:groupId" element={user ? <Group /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
    </Routes>
  );
}

export default AppRoutes;
