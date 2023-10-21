import { SearchIcon } from '@chakra-ui/icons'
import { Avatar, Heading, Text , Container, HStack, Box, Card, Divider, Input, InputGroup, InputRightElement, Button, Icon} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import jwtDecode from 'jwt-decode'
import cookie from 'react-cookies';
import { Link, useParams } from 'react-router-dom'
import { homeSocket } from '../../../../App'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchSearchUserList, fetchUserListRedux, getNotification } from '../../../../store/reducers/chat/chatList.reducer'
import { TbUserSearch  } from 'react-icons/tb';


export default function ChatList({ render , setShowfolowingList}) {
     let params = useParams()
     const cookieData = cookie.load('user_session')
     const token = jwtDecode(cookieData)
     const userId = token.userId
     const active = useRef(null)


     // redux
     const dispatch = useDispatch()
     const state = useSelector(state => state.ChatList)


     

     useEffect(() => {
          dispatch(fetchUserListRedux(userId))
          // dispatch(getNotification(cookieData))
          console.log('userNotification', state.userNotification);
     }, [render, params])
     
     console.log(state.UserList , 'state.UserList');

     
     function userNotifiCount(id , array) {
          let userInfo = array.filter(ele => ele.userInfo === id)
          return +userInfo[0].nonRead
     }

     
  return (
  
//     <Container className='ChatList' width={{md : '200px' , lg : '400px'}} gap={'10px'} display={'flex'} flexDirection={'column'} mx={'20px'} py={'20px'}>
        <>
        <InputGroup gap={'10px'}>
                 <Button className='chat_search_btn' onClick={() => setShowfolowingList(value => !value)} borderColor={'#3f72af75'} borderWidth={'1px'} borderStyle={'solid'} bg={'transparent'} >
                      {/* <Icon className='chat_search_icon' as={TbUserSearch} fontSize={'14px'} color={'#3F72AF'} /> */}
                      ＋New
                      {/* <TbUserSearch size={'30px'} color='#3F72AF'/> */}
                 </Button>

               <InputRightElement pointerEvents='none'>
                    <SearchIcon color='#3F72AF' />
               </InputRightElement>
                 {/* <Input className="searchBar-chat" placeholder='search' borderColor={'gray.300'} borderWidth={'1px'} borderStyle={'solid'}/> */}
                 <Input onChange={(e) => dispatch(e.target.value !== '' ? dispatchSearchUserList(e.target.value)
                         : fetchUserListRedux(userId))}
                         className="searchBar-chat" placeholder='search' borderColor={'#3f72af57'} borderWidth={'1px'} borderStyle={'solid'} />
          </InputGroup>
          
          <Container  className="ChatList-cont">
          {    state.UserList && 
               state.UserList.map((ele ) => (
                    <Container ref={active}  key={ele.data.id} width={'100%'} p={0} >
                              <Divider borderColor={'#3f72af57'} borderBottomWidth={'2px'} my={'10px'} />
                              <Link to={`/messages/${ele.data.id}`}>
                                   
                              <HStack className="list-item"
                                   alignItems={{ lg: 'center', xl: 'flex-start' }} position={'relative'}>
                                        <Avatar size={'md'}  src={ ele.data.img} />
                                        <Box className="item-detailes" display={'flex'} flexDirection={'column'} alignItems={'flex-start'}  marginLeft={'10px'} >
                                             <Heading  textTransform={'capitalize'} as={'h5'} fontSize={'medium'}  className='name'>{ele.data.username}</Heading>
                                             <Text className='item-cont' m={0} fontSize={'15px'} textAlign={'left'} display={{base : 'none' , lg : 'none' , xl : 'inline-block'}}  >{
                                                  
                                                  ele.messages[ele.messages.length - 1]?.content.length > 25 ?
                                                       ` ${ele.messages[ele.messages.length - 1]?.content.slice(0, 25)} ...`
                                                       :
                                                       ele.messages[ele.messages.length - 1]?.content
                                             }</Text>
                                        </Box>
                                        {
                                             ele.messages[ele.messages.length - 1]?.senderId !== userId &&  
                                             <Box position={'absolute'} right={'10px'} top={{  lg : '20px'}} justifySelf={'flex-end'} borderRadius={'50%'} h={'25px'} w={'25px'} display={userNotifiCount(ele.data.id, state.userNotification) ? 'inline-flex' : 'none'} justifyContent={'center'} alignItems={'center'} bg={'red'} p={'8px'} color={'white'}>
                                                  <Text fontSize={'15px'} m={0}>{userNotifiCount(ele.data.id, state.userNotification)}</Text>
                                             </Box>
                                        }
                                   </HStack>
                              </Link>
                    </Container>
          ))
          }
            </Container> 
            {
               state.UserList.length === 0 &&
               <>
                    <Box className='empty_list'>
                         <Box className='empty_list_img'></Box>
                         <Text color={'#112D4E'} as={'p'}>Please select a chat to start messaging</Text>
                    </Box> 
               </> 
               
          }
          </>

//     </Container>
  )

}
// e.target.classList.add('active')