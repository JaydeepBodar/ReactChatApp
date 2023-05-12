import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Input from "../components/Input";
import "./common.css";
import axios from "axios";
import { chatApi, searchApi } from "../utils/config";
import { Globalcontext } from "../store/context";
import Userlistitem from "./MUI/Userlistitem";
import { toast } from "react-toastify";
import Usergroup from "./Usergroup";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Groupchat = () => {
  const { user, Chat, setChat, loading, setloading, Selectedstate } =
    Globalcontext();
  const [open, setOpen] = useState(false);
  const [Search, setSearch] = useState("");
  const [groupchat, setGroupchat] = useState();
  const [searchresult, setSearchresult] = useState([]);
  const [selecteduser, setSelecteduser] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // for user search
  const handleChange = (search) => {
    console.log("loading", loading);
    setSearch(search);
    if (!search) {
      setloading(false);
      return;
    }
    console.log("Search", typeof search);
    setloading(true);
    const config = { headers: { Authorization: user.token } };
    axios
      .get(`${searchApi}?search=${Search}`, config)
      .then((res) => {
        setSearchresult(res.data);
      })
      .catch((e) => console.log(e.response.data.message))
      .finally(() => {
        setloading(false);
      });
  };
  // for add user
  const handleGroup = (addUser) => {
    if (selecteduser.includes(addUser)) {
      toast.warning("User Alreday exists in Group");
    } else {
      setSelecteduser([...selecteduser, addUser]);
    }
  };
  // for remove user
  const handleDelete = (deleteuser) => {
    setSelecteduser(selecteduser.filter((user) => user._id !== deleteuser._id));
  };
  // for create group
  const handleSubmit = () => {
    // if(Selectedstate.groupAdmin._id){
    //   toast.warn("Admin are already exist in group")
    // }
    if (!groupchat || !selecteduser) {
      toast.error("fill all details");
      return;
    }
    const config = { headers: { Authorization: user.token } };
    const users = selecteduser.map((u) => u._id);
    axios
      .post(
        `${chatApi}/creategroup`,
        {
          chatName: groupchat,
          users: JSON.stringify(users),
        },
        config
      )
      .then((res) => setChat([res.data, ...Chat]))
      .catch((e) => console.log(e))
      .finally(() => toast.success("Group created successfully"));
    setSelecteduser([]);
    setSearchresult([]);
  };
  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        variant="contained"
        endIcon={<AddIcon />}
        className="btnMui"
      >
        Add new Group
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="grpModal">
          <CloseIcon className="close-icon" onClick={handleClose} />
          <Typography id="modal-modal-title" variant="h4">
            Create a Group
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Input
              className="newInput"
              placeholder="Chat Name..."
              onChange={(e) => setGroupchat(e.target.value)}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Input
              className="newInput"
              placeholder="Enter User..."
              onChange={(e) => handleChange(e.target.value)}
            />
            <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: "8px" }}>
              {selecteduser.map((user) => {
                return (
                  <Usergroup
                    users={user}
                    handleClick={() => handleDelete(user)}
                  />
                );
              })}
            </Box>
            {loading ? (
              <Typography
                variant="body1"
                sx={{ textAlign: "center", margin: "8px 0" }}
              >
                Loading...
              </Typography>
            ) : (
              searchresult.map((user) => {
                return (
                  <>
                    {Search.length >= 1 && (
                      <Userlistitem
                        key={user._id}
                        user={user}
                        handleFunction={() => handleGroup(user)}
                      />
                    )}
                  </>
                );
              })
            )}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: "15px 0 0" }}
            onClick={handleSubmit}
          >
            Create Group
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default Groupchat;
