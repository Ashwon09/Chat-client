import { useContext } from "react";
import { userContext } from "./UseContexts/userinfo";
import { socket } from "./DisplayOptions";
import { getRoomNumber } from "./Services/RoomService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const JoinRoom = () => {
  const userContextValue = useContext(userContext);
  const { username, setusername, roomNo, setRoomNo, setRoomJoined } =
    userContextValue;
  const createRoom = async () => {
    if (username !== "") {
      try {
        const res = await getRoomNumber();
        if (res.data.roomNumber) {
          setRoomNo(res.data.roomNumber);
          joinRoom(res.data.roomNumber);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Username is empty");
    }
  };

  const joinRoom = (roomNumber: string = "") => {
    if (username !== "" && (roomNo !== "" || roomNumber !== undefined)) {
      const joinRoomNo = roomNumber ? roomNumber : roomNo;
      socket.emit("join_room", joinRoomNo, (success: boolean) => {
        if (success) {
          setRoomJoined(true);
        } else {
          toast.error(`Room "${roomNo}" does not exist`);
        }
      });
    } else {
      toast.error("Username or Room Number is empty");
    }
  };
  return (
    <div className="joinChatContainer">
      <h3>Join a chat room</h3>
      <input
        type="text"
        placeholder="Username"
        onChange={(event) => {
          setusername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room Number"
        value={roomNo}
        onChange={(event) => {
          setRoomNo(event.target.value);
        }}
      />
      <div className="buttonContainer">
        <button
          onClick={() => {
            joinRoom();
          }}
        >
          Join Room
        </button>
        <button onClick={createRoom}>Create Room</button>
      </div>
      <ToastContainer />
    </div>
  );
};
