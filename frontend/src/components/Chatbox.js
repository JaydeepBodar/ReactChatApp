import React from 'react'
import { Box } from '@mui/material'
import Singlechat from './Singlechat'
import { Globalcontext } from '../store/context'
const Chatbox = () => {
  const {fetch}=Globalcontext()
  return (
    <Box sx={{backgroundColor:"#f2f2f2",flex:"0 0 63%",borderRadius:"20px"}}>
      <Singlechat/>
    </Box>
  )
}

export default Chatbox
