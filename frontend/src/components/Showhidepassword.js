import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const Showhidepassword = ({passwordType}) => {
    
  return (
    <React.Fragment>
      {passwordType === "password" ? (
        <VisibilityOffIcon />
      ) : (
        <RemoveRedEyeIcon />
      )}
    </React.Fragment>
  );
};

export default Showhidepassword;
