import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ChatContext = createContext();

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [groups, setGroups] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isManageMode, setIsManageMode] = useState(false);

  const getToken = () => localStorage.getItem('token');

  // Fetch initial data
  useEffect(() => {
    if (getToken()) {
      fetchFriends();
      fetchFriendRequests();
      fetchGroups();
    }
  }, []);

  // API functions
  const fetchFriends = async () => {
    try {
      const response = await axios.get('/api/friends', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setFriends(response.data);
    } catch (error) {
      console.error('Failed to fetch friends', error);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get('/api/friends/requests', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setFriendRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch friend requests', error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get('/api/groups', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setGroups(response.data);
    } catch (error) {
      console.error('Failed to fetch groups', error);
    }
  };

  const fetchMessages = async (chatId, isGroup = false) => {
    if (!chatId) return;
    
    try {
      const params = isGroup ? { groupId: chatId } : { receiverId: chatId };
      const response = await axios.get('/api/chat', {
        params,
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };

  // Action functions
  const sendMessage = async (content) => {
    if (!activeChat || !content.trim()) return;
    
    try {
      const data = activeChat.isGroup
        ? { content, groupId: activeChat.id }
        : { content, receiverId: activeChat.id };
      
      await axios.post('/api/chat', data, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      fetchMessages(activeChat.id, activeChat.isGroup);
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  const sendFriendRequest = async (receiverId) => {
    try {
      await axios.post('/api/friends/request', { receiverId }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      fetchFriendRequests();
    } catch (error) {
      console.error('Failed to send friend request', error);
    }
  };

  const respondFriendRequest = async (requestId, status) => {
    try {
      await axios.put(`/api/friends/requests/${requestId}`, { status }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      fetchFriendRequests();
      fetchFriends();
    } catch (error) {
      console.error('Failed to respond to friend request', error);
    }
  };

  const removeFriend = async (friendId) => {
    try {
      await axios.delete(`/api/friends/${friendId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      fetchFriends();
    } catch (error) {
      console.error('Failed to remove friend', error);
    }
  };

  const createGroup = async (groupData) => {
    try {
      const response = await axios.post('/api/groups', groupData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      fetchGroups();
      return response.data;
    } catch (error) {
      console.error('Failed to create group', error);
      return null;
    }
  };

  const joinGroup = async (groupId) => {
    try {
      await axios.post('/api/groups/join', { groupId }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      fetchGroups();
    } catch (error) {
      console.error('Failed to join group', error);
    }
  };

  const value = {
    friends,
    friendRequests,
    groups,
    activeChat,
    messages,
    isManageMode,
    setIsManageMode,
    setActiveChat,
    fetchMessages,
    sendMessage,
    sendFriendRequest,
    respondFriendRequest,
    removeFriend,
    createGroup,
    joinGroup
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}