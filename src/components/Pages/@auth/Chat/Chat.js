import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import ChatList from './Chat-List'
import './Chat.scss'
import { Box, Container } from '@chakra-ui/react'
import FolowingList from './FolowingList'
import MainFooter from '../../Footer'

export default function Chat() {
  const [showfolowingList, setShowfolowingList] = useState(true)


  return (
    <div>
      <Box className='chat-page' justifyContent={{ base: 'center', xl: 'flex-end' }} height={{ base: '78vh', md: '96vh' }}>
        <Container className='ChatList' width={{ base: '700px', xl: '380px' }} gap={'10px'} flexDirection={'column'} mx={'20px'} py={'20px'}>
          {
            showfolowingList ?
              <ChatList setShowfolowingList={setShowfolowingList} />
              : <FolowingList setShowfolowingList={setShowfolowingList} />
          }
        </Container>
        <Box className='chat-container' width={{ xl: '650px' }} display={{ base: 'none', xl: 'flex' }}>chat box</Box>
      </Box>
      <MainFooter />
    </div>
  )
}
