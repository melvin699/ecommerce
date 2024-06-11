import React, { useState } from 'react';
import './Css/Contact.css';
import axios from 'axios'

const Contact = () => {

  const [formData,SetFormData] = useState({
    name: '',
    email: '',
    message:''
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [messageCount, setMessageCount] = useState('0');

  const handleChange = (e)=>{
    const {name, value} = e.target;
    SetFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();


    try{
      const response = await axios.post('http://localhost:5000/submit-message', {
        ...formData
      });
      setResponseMessage(response.data.message);
    }
    catch (error) {
      console.error('error submiting message:', error);
      setResponseMessage ('Failed to send message.Please try again later.');

    }
  }

  const fetchMessageCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/messages/count'); 
      setMessageCount(response.data.count);
    } catch (error) {
      console.error('Error fetching message count:', error);
    }
  };

  // useEffect(() => {
  //   fetchMessageCount(); // Fetch message count when component mounts
  // }, []);


  
  return (
    <>
    <div className="contact-container">

      <section id="contact" className="contact" data-aos="fade-up">
        <h2>Get in Touch</h2>
        <p>You have {messageCount} messages.</p>

        <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" id="name" name="name" required onChange={handleChange} />
            <label htmlFor="name">Name</label>
            <span className="bar"></span>
          </div>
          <div className="form-group">
            <input type="email" id="email" name="email" required onChange={handleChange} />
            <label htmlFor="email">Email</label>
            <span className="bar"></span>
          </div>
          <div className="form-group">
            <textarea id="message" name="message" rows="4" required onChange={handleChange}></textarea>
            <label htmlFor="message">Message</label>
            <span className="bar"></span>
          </div>
          <button type="submit" className="btn">Send Message</button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </section> 
    </div>

</>
  );
}

export default Contact;
