import React, { useState } from 'react';
import './ChatOverlay.css';
import axios from 'axios';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const ChatOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (input.trim() !== '') {
      const userMessage = { sender: 'user', text: input };
      setChat([...chat, userMessage]);
      setInput('');

      try {
        const response = await axios.post('http://localhost:5000/api/chat', { prompt: input });

        if (response && response.data && response.data.response) {
          const botMessage = { sender: 'bot', text: response.data.response };
          setChat((prevChat) => [...prevChat, botMessage]);

          if (response.data.response.toLowerCase().includes('tour of menu page')) {
            startTour();
          } else {
            handleUnknownResponse();
          }
        } else {
          console.error('Invalid response format or empty response:', response);
        }
      } catch (error) {
        console.error('Error fetching chat response:', error);
      }
    }
  };

  const startTour = () => {
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'shepherd-theme-custom',
        scrollTo: true,
        scrollToHandler: (element) => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        },
        modalOverlayOpeningPadding: 10,
        modalOverlayOpeningRadius: 5,
      },
    });

    tour.addStep({
      id: 'explore-menu',
      text: 'This is our explore menu section.',
      attachTo: { element: '#explore__menu', on: 'top' },
      buttons: [
        {
          text: 'Next',
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: 'menu-list',
      text: 'Here you can see different menu categories. Click on a category to explore.',
      attachTo: { element: '.explore__menu__list', on: 'top' },
      buttons: [
        {
          text: 'Finish',
          action: tour.complete,
        },
      ],
    });

    tour.start();
  };

  const handleUnknownResponse = () => {
    const botMessage = { sender: 'bot', text: "I'm sorry, I didn't understand that." };
    setChat((prevChat) => [...prevChat, botMessage]);
  };

  return (
    <div className={`chat-overlay ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <div className="chat-icon" onClick={handleToggle}>
          💬
        </div>
      )}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h4>Chat with us</h4>
            <button onClick={handleToggle}>✕</button>
          </div>
          <div className="chat-messages">
            {chat.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender}`}>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatOverlay;
