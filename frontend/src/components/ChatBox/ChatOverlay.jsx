import React, { useEffect, useState,useRef } from "react";
import "./ChatOverlay.css";
import axios from "axios";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import { useNavigate } from "react-router-dom";

const ChatOverlay = ({ apiUrl }) => {
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      handleSend();
    }
  }

  const handleSend = async () => {
    if (input.trim() !== "") 
      {
      const userMessage = { sender: "user", text: input };
      setChat([...chat, userMessage]);
      setInput("");
      try {
        const response = await axios.post(`${apiUrl}/api/food/chat`, {
          prompt: input,
        });
        if (response && response.data && response.data.startTour) {
          const botMessage = { sender: "bot", text: "Starting the tour.." };
          startTour();
          setChat((prevChat) => [...prevChat, botMessage]);
        } else if (response && response.data && response.data.addTour) {
          const botMessage = {
            sender: "bot",
            text: "Ok!, Let's first get to the add admin page.",
          };
          setChat((prevChat) => [...prevChat, botMessage]);
          const botMessage2 = {
            sender: "bot",
            text: "After reaching the main page, tell my friend he will guide you.",
          };
          setChat((prevChat) => [...prevChat, botMessage2]);
          setTimeout(() => {
            window.location.href = "http://localhost:5174/add";
          }, 1500);
        } else {
          const botMessage = {
            sender: "bot",
            text: "I can guide you how to use this website.",
          };
          setChat((prevChat) => [...prevChat, botMessage]);
        }
      } catch (error) {
        const botMessage = { sender: "bot", text: error.message };
        setChat((prevChat) => [...prevChat, botMessage]);
      }
    }
  };
  useEffect(() => {
    const botMessage1 = { sender: "bot", text: "Hi there!" };
    const botMessage2 = {
      sender: "bot",
      text: "I am your assitant, please feel free to ask me anything!",
    };
    if (isOpen && chat.length === 0) {
      setTimeout(() => {
        setChat([...chat, botMessage1, botMessage2]);
      }, 500);
    }
  }, [isOpen]);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const startTour = () => {
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: "shepherd-theme-custom",
        scrollTo: true,
        scrollToHandler: (element) => {
          element.scrollIntoView({ behavior: "smooth", block: "nearest" });
        },
        modalOverlayOpeningPadding: 10,
        modalOverlayOpeningRadius: 3,
      },
    });

    tour.addStep({
      id: "welcome",
      text: "Welcome to Tomato.com. Ahh I see you are new here and seems to be hungry. Let me give you a tour of our menu page.",
      buttons: [
        {
          text: "Let's go!",
          action: tour.next,
        },
      ],
    });
    tour.addStep({
      id: "explore-menu",
      text: "This is our explore menu section.",
      attachTo: { element: "#explore__menu", on: "top" },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "menu-list",
      text: "Here you can see different menu categories. Click on a category to explore.",
      attachTo: { element: ".explore__menu__list", on: "top" },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });
    // tour.addStep({
    //     id: 'food-display',
    //     text: 'This is the food display section where you can see the top dishes near you.',
    //     attachTo: { element: '.food__display', on: 'top' },
    //     buttons: [
    //       {
    //         text: 'Next',
    //         action: tour.next,
    //       },
    //     ],
    //   });

    tour.addStep({
      id: "food-items",
      text: "Here you can see a list of food items.",
      attachTo: { element: ".food__display__list", on: "top" },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });
    tour.addStep({
      id: "food-item",
      text: "This is a food item. You can see the image, name, rating, description, and price here.",
      attachTo: { element: ".food__item", on: "top" },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "food-item-actions",
      text: "You can add or remove this item from your cart using these buttons.",
      attachTo: { element: ".add", on: "top" },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });
    tour.addStep({
      id: "cart-navbar",
      text: "This is the basket where all the added item are stored.",
      attachTo: { element: ".navbar__basket", on: "bottom" },
      buttons: [
        {
          text: "Next",
          action: () => {
            navigate("/cart");
            tour.next();
          },
        },
      ],
    });
    tour.addStep({
      id: "cart-items",
      text: "This is the cart page.",
      buttons: [
        {
          text: "Let's go!",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "cart-items",
      text: "These are the items in your cart.",
      attachTo: { element: ".cart__items", on: "top" },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "cart-total",
      text: "This section shows the total price of your items.",
      attachTo: { element: ".cart__total", on: "top" },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });
    tour.addStep({
      id: "cart-promocode",
      text: "You can apply a promo code here.",
      attachTo: { element: ".cart__promocode", on: "top" },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "proceed-to-checkout",
      text: "Click here to proceed to checkout.",
      attachTo: { element: ".cart__total button", on: "top" },
      buttons: [
        {
          text: "Next",
          action: () => {
            tour.next();
            navigate("/placeorder");
          },
        },
      ],
    });
    tour.addStep({
      id: "place_order",
      text: "This is the order page.",
      buttons: [
        {
          text: "Let's go!",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "step-1",
      text: "Please fill in your delivery information.",
      attachTo: {
        element: ".place__order__left", // Example attachment point
        on: "top",
      },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "step-2",
      text: "Review your order totals here.",
      attachTo: {
        element: ".cart__total",
        on: "top",
      },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });
    tour.addStep({
      id: "step-3",
      text: "Now, click on 'Proceed to Payment' to complete your order.",
      attachTo: {
        element: ".cart__total button",
        on: "top",
      },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });
    tour.addStep({
      id: "finish__tour",
      text: "Thank you for keeping up with the tour. Enjoy your meal!",
      buttons: [
        {
          text: "Finish!",
          action: () => {
            navigate("/");
            tour.complete();
          },
        },
      ],
    });
    tour.start();
  };

  return (
    <div className={`chat-overlay ${isOpen ? "open" : ""}`}>
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
          <div className="chat-messages" ref={chatContainerRef}>
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
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
            />
            <button  onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatOverlay;
