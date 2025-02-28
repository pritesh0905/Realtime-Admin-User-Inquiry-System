import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../store/authStore';
import { useQueryStore } from '../store/queryStore';

interface ChatBoxProps {
  queryId: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ queryId }) => {
  const { currentUser } = useAuthStore();
  const { getQueryMessages, sendMessage, markMessagesAsRead } = useQueryStore();
  const [message, setMessage] = useState('');
  const [isAdminOnline, setIsAdminOnline] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = getQueryMessages(queryId) || []; // Ensure messages is always an array

  // Simulate real-time admin online check
  useEffect(() => {
    const checkAdminOnline = async () => {
      // Replace this with actual WebSocket or Firestore logic
      setIsAdminOnline(Math.random() > 0.5);
    };

    checkAdminOnline();
  }, []);

  useEffect(() => {
    if (currentUser) {
      markMessagesAsRead(queryId, currentUser.id);
    }
  }, [queryId, currentUser, markMessagesAsRead]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !currentUser) return;

    sendMessage(queryId, currentUser.id, message);
    setMessage('');
  };

  if (!currentUser) {
    return <div>You must be logged in to chat</div>;
  }

  return (
    <div className="flex flex-col h-96 border rounded-lg shadow-lg bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b bg-gray-100">
        <h3 className="text-lg font-medium">Live Chat</h3>
        <div className="flex items-center">
          <span className={`h-3 w-3 rounded-full mr-2 ${isAdminOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="text-sm">{isAdminOnline ? 'Admin Online' : 'Admin Offline'}</span>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 my-4">No messages yet. Start the conversation!</div>
        ) : (
          messages.map((msg) => {
            const isCurrentUser = msg.senderId === currentUser.id;
            const userType = isCurrentUser ? 'You' : 'Admin';

            return (
              <div key={msg.id} className={`mb-4 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    isCurrentUser ? 'bg-indigo-100 text-indigo-900' : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="text-xs text-gray-500 mb-1">{userType}</div>
                  <p>{msg.content}</p>
                  <div className="text-xs text-right mt-1 text-gray-500">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div className="p-3 border-t bg-gray-100">
        {!isAdminOnline && (
          <div className="text-sm text-yellow-600 mb-2">
            {currentUser.role === 'user' ? 'Admin is currently offline. Your message will be seen when they return.' : 'User is offline. They will see your messages later.'}
          </div>
        )}
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-lg disabled:bg-gray-400"
            disabled={!message.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
