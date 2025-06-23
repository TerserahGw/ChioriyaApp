import { useState } from 'react';
import Button from '../ui/Button.jsx';
import { useChat } from '../../context/ChatContext.jsx';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, activeChat } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && activeChat) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-4 border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
      />
      <Button type="submit" className="rounded-l-none">Send</Button>
    </form>
  );
};

export default MessageInput;