import { useEffect, useRef } from 'react';
import { useAuth, useChat } from '../../context';
import MessageItem from './MessageItem.jsx';

const MessageList = () => {
  const { messages } = useChat();
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {messages.length > 0 ? (
          messages.map(message => (
            <MessageItem 
              key={message._id} 
              message={message} 
              isSelf={message.sender._id === user?._id} 
            />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No messages yet. Start a conversation!</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;