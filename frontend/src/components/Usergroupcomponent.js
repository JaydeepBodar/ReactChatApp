import { Avatar, Typography,Box } from '@mui/material'
import React from 'react'

const Usergroupcomponent = ({users}) => {
  return (
    <Box className="anotheruser">
        <Avatar src={users.groupimg}/>
        <Typography variant='h6'>Group chat({users.chatName})</Typography>
    </Box>
  )
}

export default Usergroupcomponent;