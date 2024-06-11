import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Messages.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = async () => {
    if (!reply.trim()) return;

    try {
      const lastMessage = messages[messages.length - 1];
      const response = await axios.post(
        `http://localhost:5000/messages/${lastMessage._id}/user-reply`,
        {
          userReply: reply,
        }
      );

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === lastMessage._id ? { ...msg, userReply: response.data.reply } : msg
        )
      );

      setReply('');
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  return (
    <div className="messages-container">
      <h2>Messages</h2>
      <div className="messages">
        {messages.map((message) => (
          <div key={message._id} className="message-item">
            <div className={`message-content ${message.userReply ? 'user-reply' : ''}`}>
              <p>{message.message}</p>
            </div>
            {message.adminReply && (
              <div className="message-content admin-reply">
                <p>{message.adminReply}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="reply-form">
        <textarea
          value={reply}
          onChange={handleReplyChange}
          placeholder="Type your reply..."
        ></textarea>
        <button onClick={handleReplySubmit}>Send</button>
      </div>
    </div>
  );
};

export default Messages;
