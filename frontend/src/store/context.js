import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const chatContext = createContext();
const ChatProvider = ({ children }) => {
  // const location=useLocation()

  const [user, setuser] = useState("");
  const [Selectedstate, setSelectedstate] = useState();
  const [loading, setloading] = useState(false);
  const [fetchagain, setFetchagain] = useState(false);
  const [Chat, setChat] = useState([]);
  useEffect(() => {
    const newuser = JSON.parse(localStorage.getItem("userInfo"));
    setuser(newuser);
    console.log("render");
  }, []);
  const value = {
    user,
    Chat,
    setChat,
    Selectedstate,
    setSelectedstate,
    loading,
    setloading,
    fetchagain,
    setFetchagain,
  };
  return <chatContext.Provider value={value}>{children}</chatContext.Provider>;
};
export const Globalcontext = () => {
  return useContext(chatContext);
};
export default ChatProvider;
