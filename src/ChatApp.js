import React, { useState, useRef } from "react";
import { FaThumbsUp, FaPaperPlane } from "react-icons/fa";
import styles from "./ChatApp.module.css";

const emojiData = [
  "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃",
  // Add more emojis as needed
];

const getTimeStamp = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const initialMessages = [
  {
    user: "Alan",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    message: "Hello How can i help You?",
    likes: 0,
    timestamp: getTimeStamp(),
  },
  {
    user: "Bob",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    message: "Where are You!",
    likes: 0,
    timestamp: getTimeStamp(),
  },

  {
    user: "Carol",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
    message: "Let us Plan for a trip!",
    likes: 0,
    timestamp: getTimeStamp(),
  },
  {
    user: "Dean",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
    message: "Hi there!",
    likes: 0,
    timestamp: getTimeStamp(),
  },
  // Add more initial messages as needed
];

const user_list = [
  { name: "Alan", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" },
  { name: "Bob", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" },
  { name: "Carol", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80" },
  { name: "Dean", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80" },
  { name: "Elin", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
];

const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(initialMessages);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [mentionOptions, setMentionOptions] = useState([]);
  const inputRef = useRef(null);



  const getTimeStamp = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setMessage(value);
    if (value.includes("@")) {
      const mentionKeyword = value.split("@").pop().toLowerCase();
      const filteredOptions = user_list
        .filter((user) => user.name.toLowerCase().includes(mentionKeyword))
        .map((user) => user.name);
      setMentionOptions(filteredOptions);
    } else {
      setMentionOptions([]);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
    inputRef.current.focus();
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prevShowEmojiPicker) => !prevShowEmojiPicker);
  };

  const handleSendClick = () => {
    if (message.trim() !== "") {
      const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
      const newMessage = {
        user: randomUser.name,
        avatar: randomUser.avatar,
        message: message.trim(),
        likes: 0,
        timestamp: getTimeStamp(),
      };
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    }
  };

  const handleLikeClick = (index) => {
    setChatMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[index] = {
        ...updatedMessages[index],
        likes: updatedMessages[index].likes + 1,
      };
      return updatedMessages;
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "@") {
      showMentionOptions();
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleSendClick();
    }
  };

  const handleMentionOptionClick = (option) => {
    const updatedMessage = message.replace(/@[\w]+$/, `@${option} `);
    setMessage(updatedMessage);
    inputRef.current.focus();
    setMentionOptions([]);
  };

  const showMentionOptions = () => {
    const mentionText = message.slice(0, inputRef.current.selectionStart);
    const lastWord = mentionText.split(" ").pop();
  
    if (lastWord.startsWith("@")) {
      const filterOptions = user_list.filter((user) =>
        user.name.toLowerCase().includes(lastWord.slice(1).toLowerCase())
      );
      setMentionOptions(filterOptions);
    } else {
      setMentionOptions([]);
    }
  };

  return (
    <div className={styles["chat-container"]}>
      <div className={styles["chat-messages"]}>
        <div className={styles["group-header"]}>
          <div className={styles["group-info"]}>
            <div className={styles["group-name"]}>My Personal Group</div>
          </div>
          <div className={styles["group-icon"]}>&#128373; 5|21</div>
        </div>
        {chatMessages.map((chat, index) => (
          <div key={index} className={styles["chat-message"]}>
            <div className={styles["avatar"]}>
              <img src={chat.avatar} alt={chat.user} />
            </div>
            <div className={styles["message-details"]}>
              <div className={styles["username"]}>{chat.user}</div>
              <div className={styles["message"]}>{chat.message}</div>
              <div className={styles["timestamp"]}>{chat.timestamp}</div>
            </div>
            <div className={styles["like-button"]}>
              <button
                onClick={() => handleLikeClick(index)}
                className={chat.likes > 0 ? styles["liked"] : ""}
              >
                <FaThumbsUp />
              </button>
              <span className={styles["like-count"]}>{chat.likes}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles["chat-input"]}>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          placeholder="Type a message..."
          className={styles["message-input"]}
        />
        <button onClick={toggleEmojiPicker}>😀</button>
        {showEmojiPicker && (
          <div className={styles["emoji-picker"]}>
            {emojiData.map((emoji, index) => (
              <span
                key={index}
                onClick={() => handleEmojiSelect(emoji)}
                className={styles["emoji"]}
              >
                {emoji}
              </span>
            ))}
          </div>
        )}
        <button onClick={handleSendClick} className={styles["send-button"]}>
          <FaPaperPlane />
        </button>
      </div>

      {mentionOptions.length > 0 && (
        <div className={styles["mention-options-container"]}>
          {mentionOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleMentionOptionClick(option)}
              className={styles["mention-option"]}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatApp;
