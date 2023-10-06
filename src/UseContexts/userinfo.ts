import { createContext } from "react";

type UserContextType = {
  username: string;
  setusername: React.Dispatch<React.SetStateAction<string>>;
  setRoomNo: React.Dispatch<React.SetStateAction<string>>;
  roomNo: string;
  setRoomJoined: React.Dispatch<React.SetStateAction<boolean>>; // Include the correct type here
};

export const userContext = createContext<UserContextType>({
  username: "",
  setusername: () => {}, // Placeholder function
  setRoomNo: () => {},
  roomNo: "",
  setRoomJoined: () => false,
});
