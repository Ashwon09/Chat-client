import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import copy from "clipboard-copy";
import { ToastContainer, toast } from "react-toastify";

interface ChatComponentProps {
  socket: Socket;
  username: string;
  room: string;
}
interface MessageType {
  username: string;
  message: string;
  time: string;
  room: string;
  sent?: boolean;
}

const Chat: React.FC<ChatComponentProps> = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const copyRoomCode = () => {
    copy(room);
    toast.success(`copied`);
  };
  const sendMessage = async () => {
    if (message !== "") {
      const messageData: MessageType = {
        username: username,
        room: room,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      messageData.sent = true;
      setMessage("");
      setMessageList((list) => [...list, messageData]);
    }
  };
  useEffect(() => {
    const handleReceiveMessage = (data: MessageType) => {
      setMessageList((list) => [...list, data]);
    };

    // Attach the event listener
    socket.on("receive_message", handleReceiveMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);
  return (
    <>
      <div className="room-info">
        <h3>Your chat room is {room}</h3>
        <button onClick={copyRoomCode}>Copy room number</button>
      </div>
      <div className="chat-window">
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={messageContent?.sent ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="author">{messageContent.username}</p>
                      <p id="time">{messageContent.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="message..."
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            onKeyDown={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Chat;
