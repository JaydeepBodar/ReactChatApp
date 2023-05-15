import React from "react";
import Sidedrwer from "../components/MUI/Sidedrwer";
import { Globalcontext } from "../store/context";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Mychats from "../components/Mychats";
import Chatbox from "../components/Chatbox";
import "./Chatepage.css";
import Profileimage from "../components/Profileimage";
const Chatpage = () => {
  const { user } = Globalcontext();
  return (
    <React.Fragment>
      <Box>
        {/* {!user && (
          <Typography
            sx={{ textAlign: "center", margin: "20px 0" }}
            variant="h5"
          >
            Access chat page first you need to signin{" "}
            <Link to="/" style={{ textDecoration: "none" }}>
              back to login
            </Link>
          </Typography>
        )} */}
        <Sidedrwer />
        <Box className="chat-wrapper">
          {user && <Mychats />}
          {user && <Chatbox />}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Chatpage;
