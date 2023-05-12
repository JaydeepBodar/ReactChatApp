import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Globalcontext } from "../store/context";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import CloseIcon from "@mui/icons-material/Close";
import "./common.css";
import Input from "./Input";
import Usergroup from "./Usergroup";
import Userlistitem from "./MUI/Userlistitem";
import axios from "axios";
import { chatApi, searchApi } from "../utils/config";
import { toast } from "react-toastify";
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
const input = {
  margin: "12px 0 0",
};
const Updategroupchat = ({ fetchallMessage }) => {
  const {
    user,
    fetchagain,
    setFetchagain,
    loading,
    setloading,
    Selectedstate,
    setSelectedstate,
  } = Globalcontext();
  const [open, setOpen] = useState(false);
  const [Search, setSearch] = useState("");
  const [groupchat, setGroupchat] = useState();
  const [searchresult, setSearchresult] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // group rename
  const handleRename = () => {
    if (!groupchat) return;
    const config = { headers: { Authorization: user.token } };
    axios
      .put(
        `${chatApi}/renamegroup`,
        { chatId: Selectedstate._id, chatName: groupchat },
        config
      )
      .then((res) => setSelectedstate(res.data), setGroupchat(""))
      .catch((e) => console.log("e"))
      .finally(() => setFetchagain(!fetchagain));
  };
  // search and update user
  const handleSearch = (search) => {
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
      .then((res) => setSearchresult(res.data))
      .catch((e) => console.log(e.response.data.message))
      .finally(() => setloading(false));
  };
  // removeuser
  const handleRemove = (removeuser) => {
    if (
      Selectedstate.groupAdmin._id !== user._id &&
      removeuser._id !== user._id
    ) {
      toast.error("Only group Admin remove group mamber");
      return;
    }
    const config = { headers: { Authorization: user.token } };
    axios
      .put(
        `${chatApi}/removegroup`,
        { chatId: Selectedstate._id, userId: removeuser._id },
        config
      )
      .then((res) =>
        removeuser._id === user._id
          ? setSelectedstate()
          : setSelectedstate(res.data)
      )
      .catch((e) => console.log("e", e))
      .finally(() => {
        setFetchagain(!fetchagain);fetchallMessage();
      });
  };
  // Add user
  const handleAdduser = (users) => {
    if (Selectedstate.groupAdmin._id !== user._id) {
      toast.error("Only Group Admin can Add the user");
    }
    const config = { headers: { Authorization: user.token } };
    if (Selectedstate.users.find((u) => u._id === users._id)) {
      toast.warn("User Alreday exists in group");
      return;
    }
    if (Selectedstate.groupAdmin._id !== user._id) {
      toast.warn("Only Admin can add users");
      return;
    }
    axios
      .put(
        `${chatApi}/addtogroup`,
        { chatId: Selectedstate._id, userId: users._id },
        config
      )
      .then((res) => setSelectedstate(res.data), setFetchagain(!fetchagain))
      .catch((e) => console.log(e))
      .finally(() => setSelectedstate(""));
  };
  return (
    <Box>
      <Button onClick={handleOpen}>
        <RemoveRedEye color="action" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="grpModal">
          <CloseIcon className="close-icon" onClick={handleClose} />
          <Typography id="modal-modal-title" variant="h4" component="h4">
            {Selectedstate.chatName}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: "8px" }}>
            {Selectedstate.users.map((user) => {
              console.log("user", user);
              return (
                <Usergroup
                  users={user}
                  key={user._id}
                  admin={Selectedstate.groupAdmin._id}
                  handleClick={() => handleRemove(user)}
                />
              );
            })}
          </Box>

          <Box
            sx={{
              display: "flex",
              columnGap: "15px",
              justifyContent: "space-between",
              margin: "15px 0 0",
            }}
          >
            <Box sx={{ flex: "0 0 75%" }}>
              <Input
                placeholder="Chat Name..."
                className="newInput"
                value={groupchat}
                onChange={(e) => setGroupchat(e.target.value)}
              />
            </Box>
            <Button color="success" variant="contained" onClick={handleRename}>
              Update
            </Button>
          </Box>
          <Box sx={input}>
            <Input
              placeholder="Add user to Group..."
              onChange={(e) => handleSearch(e.target.value)}
              className="newInput"
            />
          </Box>
          {loading ? (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", margin: "8px 0" }}
            >
              Loading...
            </Typography>
          ) : (
            Search.length >= 1 &&
            searchresult.map((user) => {
              return (
                <>
                  {Search.length >= 1 && (
                    <Userlistitem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleAdduser(user)}
                    />
                  )}
                </>
              );
            })
          )}
          <Box
            sx={{ padding: "12px 0 0", textAlign: "right" }}
            onClick={() => handleRemove(user)}
          >
            <Button variant="contained" color="error">
              Leave Group
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Updategroupchat;
