import {
  Button,
  Tooltip,
  Box,
  Text,
  TextField,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Sidedrawer.css";
import { searchApi } from "../../utils/config";
import AccountMenu from "./AccountMenu";
import { Globalcontext } from "../../store/context";
import { useNavigate } from "react-router-dom";
import Drawerbar from "./Drawerbar";
import { toast } from "react-toastify";
import axios from "axios";
const Sidedrwer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [Search, setSearch] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const { user } = Globalcontext();
  console.log("object", user.pic);
  // for logout
  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  // for drawer
  const Openbar = () => {
    setIsOpen(!isOpen);
  };
  const Closebar = () => {
    setIsOpen(false);
  };
  // for search
  const handleclick = () => {
    if (!Search) {
      toast.error("Please enter user");
    } else {
      const config = { headers: { Authorization: user.token } };
      console.log("config",config)
      axios
        .get(`${searchApi}?search=${Search}`, config)
        .then((res) => setsearchResult(res.data))
        .catch((e) => console.log(e))
      }
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
    setsearchResult([])
  };
  return (
    <Box className="chat-header">
      <Tooltip title="search for user...">
        <Button variant="ghost" className="side-btn" onClick={Openbar}>
          <SearchIcon />
          <Typography variant="body1" className="searchfunctonality">
            Search user... 
          </Typography>
        </Button>
      </Tooltip>
      <Box>
        <Typography variant="h1" className="title">
          chatApp
        </Typography>
      </Box>
      <Box className="menu-btn">
        <Button>
          <NotificationsIcon />
        </Button>
        <AccountMenu
          avtar={user.pic}
          name={user.name}
          email={user.email}
          logOutHandler={logOutHandler}
        />
        <Drawerbar
          isOpen={isOpen}
          onClick={Openbar}
          onClose={Closebar}
          handleclick={handleclick}
          handleChange={handleChange}
          search={Search}
          searchResult={searchResult}
        />
      </Box>
    </Box>
  );
};

export default Sidedrwer;
