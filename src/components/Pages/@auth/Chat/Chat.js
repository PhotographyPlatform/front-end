import React from 'react'
import Messages from './Messages'
import ChatList from './Chat-List'
import './Chat.scss'

export default function Chat() {
  return (
    <div className='chat-page'>
      <ChatList/>
      <Messages/>
    </div>
  )
}
