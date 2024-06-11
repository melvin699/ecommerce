import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeedBackMessages.css';

const FeedBackMessages = () => {
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState({});

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  const handleReplyChange = (e, messageId) => {
    setReplies({ ...replies, [messageId]: e.target.value });
  };

  const handleReplySubmit = async (messageId) => {
    const reply = replies[messageId];
    if (!reply) return;  

    try {
      await axios.post('http://localhost:5000/reply-message', {
        messageId,
        adminReply: reply
      });

      setMessages(messages.map(message =>
        message._id === messageId ? { ...message, adminReply: reply } : message
      ));
      setReplies({ ...replies, [messageId]: '' });  
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`http://localhost:5000/delete-message/${messageId}`);
      setMessages(messages.filter(message => message._id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className='feed-back-messages'>
      <h2>Admin Messages Panel</h2>
      <ul className="messages-list">
        {messages.map(message => (
          <li key={message._id} className="message-item">
            <p><strong>From:</strong> {message.name} ({message.email})</p>
            <p><strong>Message:</strong> {message.message}</p>
            <p><strong>Reply:</strong> {message.adminReply || 'No reply yet'}</p>
            <ul>
              {message.userReplies.map((userReply, index) => (
                <li key={index}>{userReply}</li>
              ))}
            </ul>
            <textarea
              value={replies[message._id] || ''}
              onChange={(e) => handleReplyChange(e, message._id)}
              placeholder="Type your reply here"
            ></textarea>
            <button onClick={() => handleReplySubmit(message._id)}>Send Reply</button>
            <button onClick={() => handleDeleteMessage(message._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedBackMessages;
