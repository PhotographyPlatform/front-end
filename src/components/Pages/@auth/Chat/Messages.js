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
import { socket } from '../../../../App';
import { useParams } from 'react-router-dom';


/**
 Done : 
  get messages from database 
  style

*/

/*
To Do :
read
notification
get reciver info
userlist
*/

// const host = "http://localhost:3002";
// const socket = io.connect(host, { transports: ["websocket"] });

export default function Messages({setNotification , setRender}) {

     const [value , setValue] = useState('')
     const [messageContentSender, setMessageContentSender] = useState([])
     const [selectedEmoji, setSelectedEmoji] = useState(false);
     const [seen, setSeen] = useState(false);
     const [showNoti, setShowNoti] = useState(false);

     const chatContainerRef = useRef(null);
     const inputEle = useRef(null);
     const counterEle = useRef(null)


     const cookieData = cookie.load('user_session')
     const token = jwtDecode(cookieData)
     const userId = token.userId

     let reciver = window.location.pathname.split("/")[2];
     let arr = (userId + reciver).split("").sort().join("")
     let params = useParams()
     console.log('params' , params);

     const messageHandeler = async () => {
          console.log(reciver , 'reciver' , userId , 'sender');
          try {
               const res = await axios.get(`http://localhost:3002/chat/${reciver}`, { headers: { Authorization: `Bearer ${cookieData}` } })

               
               let resieveData = res.data.resieveData.map(async ele => {
                    if (!ele.read) {
                         const makeItSeen = await axios.put(`http://localhost:3002/chat/${ele.id}/${reciver}`, { read: true }, { headers: { Authorization: `Bearer ${cookieData}` } })
                         setSeen(true)
                         ele.read = true
                         return ele
                    }
               })

               // console.log('resieveData' , resieveData);
               let msg = [...res.data.sendData, ...res.data.resieveData]
               let sortedMSG = msg.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
               console.log(msg);
               setMessageContentSender(msg)
               
          } catch (err) {     
               console.log( 'get message page error',err );
          }
     }

     // get message date function
     function getData(date = new Date()) {
          const dateObject = new Date(date);
     
          const options = {  month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
     
          const readableDate = dateObject.toLocaleDateString('en-US', options);
          
          return readableDate.replace('at' , ' | ')
     }

     const scrollToBottom =  () => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
     };     

     useEffect(() => {
          messageHandeler() 
     }, [params])

     useEffect(() => {
          scrollToBottom();
     }, [messageContentSender ])


     const obj = {
          content: "",
          receiverId: reciver,
          senderId: userId,
          counter: 0,
          read: false,
          room: arr
     };

     socket.emit("joinRoom", obj);

     socket.on('userSocket', (socketId) => {
          console.log( 'socketId', socketId);
     })


     function send() {
          obj.content = value
          socket.emit("message", obj);
          inputEle.current.value = ''
          setSelectedEmoji(false)
          setNotification(true)
          setRender(value => !value )
     };


     socket.on("test", (message) => {

          // console.log(message);

          if (message.senderId == userId) {
               
               setMessageContentSender( [...messageContentSender,   {content : message.content , who : 'sender'}])
          } else {
               setMessageContentSender( [...messageContentSender,   {content : message.content , who : 'reciver'}])
          }
     });


     // useEffect(() => {
     //      socket.on("notificaton", (count) => {
     //           console.log(count);
     //           setShowNoti(true)
     //           // counterEle.current.style.display = "inline-block";
     //           if (counterEle.current) {
     //                counterEle.current.innerHTML = count;
     //           }
     //      });
      
     //      // counterEle.current.onclick = handleCounterClick;
      
     //      return () => {
     //      //   socket.off("notification", handleNotification);
     //      //   counterEle.current.onclick = null;
     //      };     
     //    }, [])


     socket.on("notificaton", (count) => {
          console.log(count);
          setShowNoti(true)
          if (counterEle.current) {
               counterEle.current.innerHTML = count;
          }
          
     });

     if (counterEle.current) {
          counterEle.current.onclick = (e) => {
               counterEle.current.innerHTML = 0;
               socket.emit("zero");
          };
     }


     const handleEmoji = () => {
          setSelectedEmoji(!selectedEmoji);
     };
     const handleEmojSelect = (emoji) => {
          inputEle.current.value += emoji.native
          setValue(inputEle.current.value)
     };
     
     return (
     <>               
     <Box className="chat-container"  >
     <div className="notifications"> notifications <span ref={counterEle} style={{display : showNoti ? 'inline-block' : 'none'}} className="counter"></span></div> 
          <Box className="sub-chat-container" height={'95%'} display={'flex'} flexDirection={'column'} justifyContent={'flex-end'}>
               <Box className="chat" ref={chatContainerRef} maxH={{base : '600px'}}>
                    {
                         messageContentSender.map((ele , i) => (
                              <div key={i} className='message-cont'>
                                   <div  className={ele.who === 'sender' || ele.senderId === userId ? 'message outgoing' : 'message'}>
                                        <p>{ele.content}</p> 

                                        <Avatar size={'sm'} src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png'
                                        className={ele.who === 'sender' || ele.senderId === userId ?'date-msg-out' : 'date-msg-in'}/>
                                   </div>
                                   <p className={ele.who === 'sender' || ele.senderId === userId ?'date-msg-out' : 'date-msg-in'}>{getData(ele.createdAt)}</p>
                              </div>
                         ))
                    }               
               </Box>
               
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
                    <Box display={'flex'} >
                         <Avatar size={'sm'} name='Dan Abrahmov' src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png' />
                         <Input ref={inputEle} width={{base : '150px' ,md: '300px' , sm : '200px' , lg: '550px'}} border={'none'} _focusVisible={'none'} fontSize={'17px'} onChange={(e) => setValue(e.target.value)} placeholder='Type message' />
                    </Box>
                    <Box display={'flex'}>
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
          </Box>
     </Box>
     </>
  )
}


     // let sender = window.location.pathname.split("/")[2];
     // let reciver = window.location.pathname.split("/")[3];
     // let arr = (sender + reciver).split("").sort().join("")