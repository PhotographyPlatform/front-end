import React, { useState } from 'react'
import Messages from './Messages'
import ChatList from './Chat-List'
import './Chat.scss'
import { Box , Container } from '@chakra-ui/react'
import FolowingList from './FolowingList'

export default function MessagePage({render, setRender}) {
  const [showfolowingList , setShowfolowingList] = useState(true)
  return (
    <Box className='chat-page' justifyContent={{ base: 'center', lg: 'flex-end' }} height={{ base: '78vh', md: '96vh' }}>
      
      <Container className='ChatList' width={{ lg: '300px', xl: '350px'}} gap={'10px'} display={{base:'none', xl:'flex'}} flexDirection={'column'} mx={'20px'} py={'20px'}>
          {
            showfolowingList ?
            <ChatList render={render} setShowfolowingList = {setShowfolowingList}/>
            : <FolowingList setShowfolowingList = {setShowfolowingList} />
          }
      </Container>
      
      <Messages  setRender = {setRender}/>
    </Box>
  )
}
