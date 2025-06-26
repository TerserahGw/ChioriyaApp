import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '../context';
import ChatHeader from '../components/chat/ChatHeader.jsx';
import MessageList from '../components/chat/MessageList.jsx';
import MessageInput from '../components/chat/MessageInput.jsx';

const ChatPage = () => {
  const { chatId } = useParams();
  const { activeChat, setActiveChat, fetchMessages } = useChat();

  useEffect(() => {
    // Set active chat to friend
    setActiveChat({
      id: chatId,
      isGroup: false,
      name: 'Friend Name',
      profilePic: '',
    });
    
    // Fetch messages for this chat
    fetchMessages(chatId, false);
  }, [chatId, setActiveChat, fetchMessages]);

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatPage;