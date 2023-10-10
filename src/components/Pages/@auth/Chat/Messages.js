import { Avatar, Box, Button, Divider, Flex, HStack, Icon, Input , Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import cookie from 'react-cookies';
import jwtDecode from "jwt-decode";
import { io } from 'socket.io-client';
import './message.scss'
import { BsFillSendFill  } from 'react-icons/bs';
import { MdEmojiEmotions } from 'react-icons/md';
import { IoSend } from 'react-icons/io5';

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { homeSocket, socket } from '../../../../App';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo, fetchUserListRedux, getNotification } from '../../../../store/reducers/chat/chatList.reducer';



// const host = "http://localhost:3002";
// const socket = io.connect(host, { transports: ["websocket"] });

export default function Messages({setRender}) {

     const [value , setValue] = useState('')
     const [messageContentSender, setMessageContentSender] = useState([])
     const [selectedEmoji, setSelectedEmoji] = useState(false);


     const chatContainerRef = useRef(null);
     const inputEle = useRef(null);


     const cookieData = cookie.load('user_session')
     const token = jwtDecode(cookieData)
     const userId = token.userId

     let reciver = window.location.pathname.split("/")[2];
     let arr = (userId + reciver).split("").sort().join("")
     let params = useParams()

     const despatch = useDispatch()
     const selector = useSelector(state => state.ChatList)
     const userInfo = selector.userInfo.userInfo

     const messageHandeler = async () => {
          console.log(reciver , 'reciver' , userId , 'sender');
          try {
               const res = await axios.get(`http://localhost:3002/chat/${reciver}`, { headers: { Authorization: `Bearer ${cookieData}` } })

               
               let resieveData = res.data.resieveData.map(async ele => {
                    if (!ele.read) {
                         const makeItSeen = await axios.put(`http://localhost:3002/chat/${ele.id}/${reciver}`, { read: true }, { headers: { Authorization: `Bearer ${cookieData}` } })
                         return ele
                    }
               })

               let msg = [...res.data.sendData, ...res.data.resieveData]
               let sortedMSG = msg.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
               setMessageContentSender(msg)
               
          } catch (err) {     
               console.log( 'get message page error',err );
          }
     }

//======================= message date handeler =====================

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

//======================= useEffect handeler =======================

     useEffect(() => {
          messageHandeler() 
          despatch(fetchUserInfo(reciver, cookieData))
          despatch(fetchUserListRedux(userId))
          despatch(getNotification(cookieData))

          // homeSocket.on('msgNotificaton', msg => {
          // })
          
     }, [params])

     useEffect(() => {
          scrollToBottom();
     }, [messageContentSender])
     
     // console.log('selector',userInfo);

//======================= socket handeler =========================
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
          setRender(value => !value)
          
          homeSocket.emit("notificaton", reciver);
     };

     socket.on("test", (message) => {
          if (message.senderId == userId) {
               
               setMessageContentSender( [...messageContentSender,   {content : message.content , who : 'sender'}])
          } else {
               setMessageContentSender( [...messageContentSender,   {content : message.content , who : 'reciver'}])
          }
     });

//======================= Emoji handeler ==========================

     const handleEmoji = () => {
          setSelectedEmoji(!selectedEmoji);
     };
     const handleEmojSelect = (emoji) => {
          inputEle.current.value += emoji.native
          setValue(inputEle.current.value)
     };
//==================================================================

     return (
     <>            
     <Box className="chat-container"  >  
          <Box maxH={'40px'}>
               <Box display={'flex'} alignItems={'center'} gap={'10px'}>
                    <Avatar size={'sm'} src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png' />
                    <Text textTransform={'capitalize'} margin={0} >{userInfo?.username}</Text>
               </Box>
               <Divider  borderBottomWidth={'2px'}  marginTop={'7px'}/>
          </Box>

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
                         
               <HStack className='message-field' my={'20px'} width={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'}>
                    <Box display={'flex'} >
                         <Avatar size={'sm'} name='Dan Abrahmov' src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png' />
                         <Input ref={inputEle}  width={{base :'200px' ,sm : '250px', md: '400px' , lg : '430px'  }} border={'none'} _focusVisible={'none'} fontSize={'17px'} onChange={(e) => setValue(e.target.value)} placeholder='Type message' />
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
