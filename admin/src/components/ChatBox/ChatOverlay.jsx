import React, { useState, useEffect } from "react";
import { FaComments } from "react-icons/fa";
import axios from "axios";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import "./ChatOverlay.css";
import { useRef } from "react";

const ChatOverlay = ({ apiUrl }) => {
  const chatContainerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (prompt.trim() !== "") {
      const userMessage = { sender: "user", message: prompt };
      setChatHistory([...chatHistory, userMessage]);
      setPrompt("");

      // Add user's message to chat history

      try {
        const res = await axios.post(`${apiUrl}/api/food/tour`, { prompt });
        if (res.data.startTour) {
          startTour();
        } else if (res.data.mainTour) {
          const botmsg = {
            sender: "api",
            message: "Ok!, Let's first get to the main page.",
          };
          setChatHistory((prevHistory) => [...prevHistory, botmsg]);
          const botmsg2 = {
            sender: "api",
            message:
              "After reaching the main page, tell my friend he will guide you.",
          };
          setChatHistory((prevHistory) => [...prevHistory, botmsg2]);
          setTimeout(() => {
            window.location.href = "http://localhost:5173/";
          }, 1500);
        }
        setChatHistory((prevHistory) => [
          ...prevHistory,
          {
            sender: "api",
            message:
              res.data.startTour || res.data.mainTour
                ? "Starting the tour..."
                : "I can guide you how to use this website.",
          },
        ]);
      } catch (error) {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { sender: "user", message: prompt },
          { sender: "api", message: "Error: Unable to fetch response." },
        ]);
      } finally {
        setPrompt("");
      }
    }
  };
  useEffect(() => {
    const botMessage1 = { sender: "api", message: "Hi there!" };
    const botMessage2 = {
      sender: "api",
      message: "I am your assitant, please feel free to ask me anything!",
    };
    if (isOpen && chatHistory.length === 0) {
      setTimeout(() => {
        setChatHistory([...chatHistory, botMessage1, botMessage2]);
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const startTour = () => {
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: "shepherd-theme-custom",
        scrollTo: true,
        scrollToHandler: function (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        },
        modalOverlayOpeningPadding: 2,
        modalOverlayOpeningRadius: 3,
      },
    });

    tour.addStep({
      id: "welcome",
      text: "Welcome to the Add Product Page! Let us guide you through the process of adding a new product.",
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "upload-image",
      text: "First, upload an image of the product.",
      attachTo: { element: ".img__upload", on: "left" },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "product-name",
      text: "Enter the name of the product here.",
      attachTo: { element: ".add__product__name", on: "right" },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "product-description",
      text: "Provide a detailed description of the product.",
      attachTo: { element: ".add__product__description", on: "right" },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "category-price",
      text: "Select a category and enter the price of the product.",
      attachTo: { element: ".add__category__price", on: "right" },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "submit",
      text: "Finally, click this button to add the product.",
      attachTo: { element: ".add__button", on: "left" },
      buttons: [
        {
          text: "That's it, You are ready to go!",
          action: tour.complete,
        },
      ],
    });

    tour.start();
  };

  return (
    <div className={`chat-overlay ${isOpen ? "open" : ""}`}>
      {!isOpen && (
        <div className="chat-icon" onClick={setIsOpen}>
          💬
        </div>
      )}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h4>Chat with us</h4>
            <button onClick={toggleChat}>✕</button>
          </div>
          <div className="chat-messages" ref={chatContainerRef}>
            {chatHistory.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender}`}>
                <p>{message.message}</p>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={prompt}
              onKeyDown={handleKeyPress}
              onChange={handlePromptChange}
              placeholder="Type your message..."
            />
            <button onClick={handleSubmit}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatOverlay;
