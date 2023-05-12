import { Avatar, Typography,Box } from '@mui/material'
import React from 'react'

const Usercomponent = ({users}) => {
  return (
    <Box className="anotheruser">
        <Avatar src={users[1].pic}/>
        <Typography variant='h6'>{users[1].name}</Typography>
    </Box>
  )
}

export default Usercomponent;
