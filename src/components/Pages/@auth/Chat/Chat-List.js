import { SearchIcon } from '@chakra-ui/icons'
import { Avatar, Heading, Text , Container, HStack, Box, Card, Divider, Input, InputGroup, InputRightElement} from '@chakra-ui/react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import cookie from 'react-cookies';
import { Link } from 'react-router-dom'
import { homeSocket } from '../../../../App'

export default function ChatList({ render}) {
     const [userList, setUserList] = useState([])
     const [messageCount, setMessageCount] = useState([])

     const cookieData = cookie.load('user_session')
     const token = jwtDecode(cookieData)
     const userId = token.userId
     
     const fetchUserList = async () => {
          const res = await axios.get(`http://localhost:3002/messegeslist/${userId}`)        
          setUserList(res.data.data)
          const result = res.data.data
          let msgCount = []

          for (const ele of result) {
               
               let filter = ele.messages.filter(ele => ele.read === false)
               msgCount.push({ userInfo: ele.data.username, nonRead: filter.length })
          }
          console.log(msgCount , 'count');
     }
     

     homeSocket.on('msgNotificaton', msg => {
          fetchUserList()
     })
     
     // console.log(userList);

     //  render
     useEffect(() => {
          fetchUserList()
     }, [render])
     
  return (
  
    <Container className='ChatList' width={'400px'} gap={'10px'} display={'flex'} flexDirection={'column'} mx={'20px'} py={'20px'}>
      <InputGroup>
          <InputRightElement pointerEvents='none'>
               <SearchIcon color='gray.300' />
               
          </InputRightElement>
          <Input className="searchBar-chat" placeholder='search'/>
     </InputGroup>
     <Container  className="ChatList-cont">
     {    userList && 
          userList.map((ele ) => (
               <Container key={ele.data.id} width={'100%'} >
                         <Divider />
                         <Link to={`/messages/${ele.data.id}`}>
                              
                         {/* <ChakraLink as={ReactRouterLink} to={`/messages/${ele.data.id}`}>go</ChakraLink> */}
                              <HStack className="list-item">
                                   <Avatar size={'md'} name={ele.data.username} src={ ele.data.img || 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png'} />
                                   <Box className="item-detailes" display={'flex'} flexDirection={'column'} alignItems={'flex-start'}  marginLeft={'10px'} >
                                        <Heading  textTransform={'capitalize'} as={'h5'} fontSize={'medium'}  className='name'>{ele.data.username}</Heading>
                                   <Text className='item-cont' textAlign={'left'} >{
                                        
                                        ele.messages[ele.messages.length - 1]?.content.length > 50 ?
                                             ` ${ele.messages[ele.messages.length - 1]?.content.slice(0, 50)} ...`
                                             :
                                             ele.messages[ele.messages.length - 1]?.content
                                   }</Text>
                                   </Box>
                              </HStack>
                         </Link>
                    </Container>
         ))
     }
     </Container> 
            
     
      
      
    </Container>
  )

}
