import React, { useState } from 'react'
import Messages from './Messages'
import ChatList from './Chat-List'
import './Chat.scss'

export default function MessagePage({ setNotification }) {
  const [render , setRender] = useState(true)
  return (
     <div className='chat-page'>
          <ChatList render= {render}/>
          <Messages setNotification = {setNotification }  setRender = {setRender}/>
     </div>
  )
}
