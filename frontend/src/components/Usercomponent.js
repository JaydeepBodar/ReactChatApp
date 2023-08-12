import { Avatar, Typography,Box } from '@mui/material'
import React from 'react'
import { Globalcontext } from '../store/context'

const Usercomponent = ({users}) => {
  return (
    <Box className="anotheruser">
        <Avatar src={users?.pic}/>
        <Typography variant='h6'>{users?.name}</Typography>
    </Box>
  )
}

export default Usercomponent;
