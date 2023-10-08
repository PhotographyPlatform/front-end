import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import ChatList from './Chat-List'
import './Chat.scss'
import { Box } from '@chakra-ui/react'

export default function Chat() {

  
  return (
    <div className='chat-page'>
      <ChatList />
      {/* <Messages setNotification = {setNotification } /> */}
      <Box className='chat-container' width={'715px'} display={{base : 'none' , md : 'flex'}}>chat box</Box>
    </div>
  )
}
