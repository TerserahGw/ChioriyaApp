import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { useChat } from '../context/ChatContext.jsx';
import ChatSidebar from '../components/layout/ChatSidebar.jsx';
import Message from '../components/chat/Message.jsx';
import MessageInput from '../components/chat/MessageInput.jsx';
import ChatHeader from '../components/chat/ChatHeader.jsx';

const Group = () => {
  const { groupId } = useParams();
  const { user } = useAuth();
  const { activeChat, messages, setActiveChat, fetchMessages } = useChat();
  const [group, setGroup] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const mockGroup = {
      _id: groupId,
      name: 'Sample Group',
      profilePic: '',
      members: [
        { user: { _id: '1', username: 'User1', profilePic: '' }, role: { _id: '1', name: 'Owner', color: '#FFA726' } },
        { user: { _id: '2', username: 'User2', profilePic: '' }, role: { _id: '2', name: 'Member', color: '#8B5E3C' } },
      ],
      rooms: [
        { _id: '1', name: 'General' },
        { _id: '2', name: 'Admin' },
      ],
    };
    setGroup(mockGroup);
    setActiveChat({
      id: groupId,
      isGroup: true,
      name: mockGroup.name,
      profilePic: mockGroup.profilePic,
      members: mockGroup.members,
    });
    fetchMessages(groupId, true);
  }, [groupId, setActiveChat, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="ml-64 flex flex-col h-screen">
      <ChatHeader chat={activeChat} />

      <div className="flex-1 flex">
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            {messages.length > 0 ? (
              messages.map(message => (
                <Message key={message._id} message={message} />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No messages yet. Start a conversation!</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <ChatSidebar group={group} />
      </div>

      <MessageInput />
    </div>
  );
};

export default Group;