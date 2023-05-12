import React from 'react'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Globalcontext } from '../store/context';
const Usergroup = ({users,handleClick,admin}) => {
  return (
    <Box>
    <Button endIcon={<CloseIcon onClick={handleClick} className="icon"/>} variant="contained" color='success' sx={{padding:"5px 8px",fontSize:"12px",margin:"10px 0 0"}}>{users.name} { admin === users._id && <p style={{margin:"0"}}>(Admin)</p>}</Button>
    </Box>
  )
}

export default Usergroup;
