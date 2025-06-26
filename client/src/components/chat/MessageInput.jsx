import { useState } from 'react';
import { useChat } from '../../context';
import Button from '../ui/Button.jsx';

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
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <Button type="submit" className="rounded-l-none">Send</Button>
      </div>
    </form>
  );
};

export default MessageInput;