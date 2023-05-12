import React from "react";
import { Box, Container, Typography } from "@mui/material";
import "./Homepage.css";
import CloseTab from "../components/MUI/CloseTab";
import Toascontainer from "../components/MUI/Toascontainer";
const Homepage = () => {
  return (
    <Box className='main-wrapper'>
      <Container>
        <Box className="site-wrapper">
          <Box className="main-title">
            <Typography variant="h5">React Chat App</Typography>
          </Box>
          <Box>
            <CloseTab />
          </Box>
          {/* <Priviewimg/> */}
        </Box>
        <Toascontainer/>
      </Container>
    </Box>
  );
};

export default Homepage;
