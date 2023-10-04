import { Avatar, Box, Button, Flex, HStack, Icon, Input , Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import cookie from 'react-cookies';
import { io } from 'socket.io-client';
import jwtDecode from "jwt-decode";
import './message.scss'
import { BsFillSendFill  } from 'react-icons/bs';
import { MdEmojiEmotions } from 'react-icons/md';
import { IoSend } from 'react-icons/io5';

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'



/*
*** get messages from database ***

style
get reciver info
link two users with one room
read
notification

userlist
*/


export default function Messages() {
     const host = "http://localhost:3002";
     const socket = io.connect(host, { transports: ["websocket"] });
     const [value , setValue] = useState('')
     const [messageContentSender, setMessageContentSender] = useState([])
     const [selectedEmoji, setSelectedEmoji] = useState(false);

     const chatContainerRef = useRef(null);
     const inputEle = useRef(null);
     

     const cookieData = cookie.load('user_session')
     const cookieData2 = cookie.load('user')
     const token = jwtDecode(cookieData)
     const userId = token.userId

     let reciver = window.location.pathname.split("/")[2];
     let arr = (userId + reciver).split("").sort().join("")

     const messageHandeler = async () => {
          console.log(reciver , 'reciver' , userId , 'sender');
          try {
               const res = await axios.get(`http://localhost:3002/chat/${reciver}`, { headers: { Authorization: `Bearer ${cookieData}` } })
               let msg = [...res.data.sendData, ...res.data.resieveData]
               let sortedMSG = msg.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
               console.log(msg);
               setMessageContentSender(msg)
               
          } catch (err) {     
               console.log( 'get message page error',err );
          }
     }

     function getData(date = new Date()) {
          const dateObject = new Date(date);
     
          const options = {  month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
     
          const readableDate = dateObject.toLocaleDateString('en-US', options);
          
          return readableDate.replace('at' , ' | ')
     }

     const scrollToBottom =  () => {
          if (chatContainerRef.current) {
               console.log('scrollHeight' ,chatContainerRef.current.scrollHeight);
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        };     

     useEffect(() => {
          messageHandeler() 
     }, [])

     useEffect(() => {
          scrollToBottom();
     }, [messageContentSender])
     
     

     // let counterEle = document.querySelector(".counter");
     
     // let btn = document.querySelector(".btn");
     // let input = document.querySelector(".input");
     // let chatBOx = document.querySelector(".chatbox");
     // let chat = document.querySelector(".chat");
     // console.log(arr);


     const obj = {
          content: "",
          receiverId: reciver,
          senderId: userId,
          counter: 0,
          read: false,
          room: arr
     };

     socket.emit("joinRoom", obj);

     function send() {
          obj.content = value
          socket.emit("message", obj);
          inputEle.current.value = ''
          setSelectedEmoji(false)
     }


     socket.on("test", (message) => {

          console.log(message);

          if (message.senderId == userId) {
               
               setMessageContentSender( [...messageContentSender,   {content : message.content , who : 'sender'}])
          } else {
               setMessageContentSender( [...messageContentSender,   {content : message.content , who : 'reciver'}])
          }
     });

     // socket.on("notificaton", (count) => {
     //      counterEle.style.display = "inline-block";
     //      counterEle.innerHTML = count;
     // });

     // counterEle.onclick = (e) => {
     //      counterEle.innerHTML = 0;
     //      socket.emit("zero");
     // };



     const handleEmoji = () => {
          setSelectedEmoji(!selectedEmoji);
          
     };


     const handleEmojSelect = (emoji) => {
          inputEle.current.value += emoji.native
          setValue( inputEle.current.value)
     }
     
     return (
     <>
     {/* <div className="chat-contianer">
          <div className="chatbox"></div>
     </div>
     <div className="notifications"> notifications <span className="counter"></span></div> */}
               
     <div className="chat-container" >

          <div className="chat"ref={chatContainerRef} >
               {
                    messageContentSender.map((ele , i) => (
                         <div className='message-cont'>
                              <div key={i} className={ele.who === 'sender' || ele.senderId === userId ? 'message outgoing' : 'message'}>
                                   <p>{ele.content}</p> 

                                   <Avatar size={'sm'} src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png'
                                   className={ele.who === 'sender' || ele.senderId === userId ?'date-msg-out' : 'date-msg-in'}/>
                              </div>
                              <p className={ele.who === 'sender' || ele.senderId === userId ?'date-msg-out' : 'date-msg-in'}>{getData(ele.createdAt)}</p>
                         </div>
                    ))
               }               
          </div>
          
          {/* <div className="chat">
               {    
                    messageContentSender.map((ele , i) => (
                         <>
                              <div key={i} className={ele.who === 'sender' && ele.senderId === userId ? 'message outgoing' : 'message'}>
                                   <p>{ele.content}</p> 

                                   <Avatar size={'sm'} src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png'
                                   className={ele.who === 'sender' || ele.senderId === userId ?'date-msg-out' : 'date-msg-in'}/>
                              </div>
                         <p className={ele.who === 'sender' || ele.senderId === userId ?'date-msg-out' : 'date-msg-in'}>{getData(ele.createdAt)}</p>
                         </>
                    ))
               }               
          </div> */}
                    
               <HStack className='message-field' my={'20px'} width={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'}>
                    <Box>
                         <Avatar size={'sm'} name='Dan Abrahmov' src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png' />
                         <Input ref={inputEle} width={'550px'} border={'none'} _focusVisible={'none'} fontSize={'17px'} onChange={(e) => setValue(e.target.value)} placeholder='Type message' />
                    </Box>
                    <Box>
                         <Button bg={'transparent'} gap={'15px'} px={'5px'} variant = 'solid' onClick={handleEmoji}>
                         <div className="icon-container">
                              <MdEmojiEmotions color='#757575' size={22} cursor={'pointer'}/>
                         </div>

                         </Button>
                         <Button onClick={send} bg={'transparent'} gap={'15px'} variant = 'solid' >
                              <IoSend color='#3b71ca' size={22} />
                         </Button>
                    </Box>
               </HStack>
               {
               selectedEmoji && 
               <Box className='emoji-con'>
                    <Picker data={data} onEmojiSelect={handleEmojSelect} />
               </Box>
               }
               {
               selectedEmoji && 
               <Box className='emoji-con'>
                    <Picker data={data} onEmojiSelect={handleEmojSelect} />
               </Box>
               }

          
     </div>
     </>


  )
}


     // let sender = window.location.pathname.split("/")[2];
     // let reciver = window.location.pathname.split("/")[3];
     // let arr = (sender + reciver).split("").sort().join("")