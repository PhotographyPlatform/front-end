import { Avatar, Heading, Text, Container, HStack, Box, Card, Divider, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { BsFillChatDotsFill } from 'react-icons/bs';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { dispatchSearchFolowingChatList, fetchFolowingChatList } from '../../../../store/reducers/chat/chatList.reducer';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode'
import cookie from 'react-cookies';



export default function FolowingList({ setShowfolowingList }) {
     
     const dispatch = useDispatch()
     const selector = useSelector(state => state.ChatList)
     console.log('dispatchSearchFolowingChatList', selector.folowingChatList);

     const cookieData = cookie.load('user_session')
     
     useEffect(() => {
          dispatch(fetchFolowingChatList(cookieData))
     }, [])
     
     

     return (
          <>
     <InputGroup gap={'10px'}>
          
          <Button onClick={() => (setShowfolowingList(value => !value))} borderColor={'gray.300'} borderWidth={'1px'} borderStyle={'solid'} bg={'transparent'} _hover={{ bg: 'white' }}>
               <BsFillChatDotsFill size={'30px'}/>
          </Button>

          <InputRightElement pointerEvents='none' >
               <SearchIcon color='gray.300' />
          </InputRightElement>
          
                    <Input onChange={(e) => dispatch(e.target.value !== '' ? dispatchSearchFolowingChatList(e.target.value)
                         : fetchFolowingChatList(cookieData))}
                         className="searchBar-chat" placeholder='search' borderColor={'gray.300'} borderWidth={'1px'} borderStyle={'solid'} />
          </InputGroup>

     <Container  className="ChatList-cont">
          {
               selector.folowingChatList.map(ele => (
                    
                    <Container key={ele.id} width={'100%'} p={0} >
                              <Divider borderBottomWidth={'2px'} borderColor={'#00000020'} />
                              <Link to={`/messages/${ele.id}`}>
                                   <HStack className="list-item" alignItems={{ lg : 'center'}} gap={'20px'}>
                                        <Avatar size={'md'} name={''} src={ 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png'} />
                                        <Heading  textTransform={'capitalize'} as={'h5'} fontSize={'15px'}  className='name'>{ele.name}</Heading>
                                   </HStack>
                              </Link>
                    </Container>
               ))
          }
          
     </Container> 
</>
  )
}
