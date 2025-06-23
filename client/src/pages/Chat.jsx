import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { useChat } from '../context/ChatContext.jsx';
import Message from '../components/chat/Message.jsx';
import MessageInput from '../components/chat/MessageInput.jsx';
import ChatHeader from '../components/chat/ChatHeader.jsx';

const Chat = () => {
  const { chatId } = useParams();
  const { user } = useAuth();
  const { activeChat, messages, setActiveChat, fetchMessages } = useChat();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setActiveChat({
      id: chatId,
      isGroup: false,
      name: 'Friend Name',
      profilePic: '',
    });
    fetchMessages(chatId, false);
  }, [chatId, setActiveChat, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="ml-64 flex flex-col h-screen">
      <ChatHeader chat={activeChat} />

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

      <MessageInput />
    </div>
  );
};

export default Chat;