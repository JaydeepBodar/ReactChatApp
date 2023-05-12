import { Avatar, Typography,Box } from '@mui/material'
import React from 'react'
import { Globalcontext } from '../../store/context'
import "../common.css"
const Userlistitem = ({user,handleFunction}) => {
  return (
    <Box className="user-details" onClick={handleFunction}>
      <Avatar src={user.pic}/>
      <Box>
        <Typography variant='h6'><b>Name :-</b> {user.name}</Typography>
        <Typography variant='body1'><b>Email :-</b> {user.email}</Typography>
      </Box>
    </Box>
  )
}

export default Userlistitem
