import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import { JoinRoom } from "./JoinRoom";
import { userContext } from "./UseContexts/userinfo";

export const socket = io("http://localhost:3001");

export const DisplayOptions = () => {
  const [username, setusername] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [roomJoined, setRoomJoined] = useState(false);

  return (
    <>
      <userContext.Provider
        value={{
          username,
          setusername,
          setRoomNo,
          roomNo,
          setRoomJoined,
        }}
      >
        {!roomJoined ? (
          <JoinRoom />
        ) : (
          <Chat socket={socket} username={username} room={roomNo} />
        )}
      </userContext.Provider>
    </>
  );
};
