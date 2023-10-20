import { Avatar, Heading, Text, Container, HStack, Box, Card, Divider, Input, InputGroup, InputRightElement, Button, Icon } from '@chakra-ui/react'
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
          
          <Button className='chat_search_btn' onClick={() => (setShowfolowingList(value => !value))} borderColor={'gray.300'} borderWidth={'1px'} borderStyle={'solid'} bg={'transparent'}>
               {/* <BsFillChatDotsFill size={'30px'}/> */}
               <Icon className='chat_search_icon' as={ BsFillChatDotsFill} fontSize={'24px'} color={'#3F72AF'}/>
          </Button>

          <InputRightElement pointerEvents='none' >
               <SearchIcon color='#3F72AF' />
          </InputRightElement>
          
                    <Input onChange={(e) => dispatch(e.target.value !== '' ? dispatchSearchFolowingChatList(e.target.value)
                         : fetchFolowingChatList(cookieData))}
                         className="searchBar-chat" placeholder='search' borderColor={'#3F72AF'} borderWidth={'1px'} borderStyle={'solid'} />
     </InputGroup>

          <Container  className="ChatList-cont">
               {
                    selector.folowingChatList.map(ele => (
                         
                         <Container key={ele.id} width={'100%'} p={0} >
                                   <Divider borderBottomWidth={'2px'} borderColor={'#3f72af57'} />
                                   <Link to={`/messages/${ele.id}`}>
                                        <HStack className="list-item" alignItems={{ lg : 'center'}} gap={'20px'}>
                                             <Avatar size={'md'}  src={ele.img} />
                                             <Heading  textTransform={'capitalize'} as={'h5'} fontSize={'15px'}  className='name'>{ele.name}</Heading>
                                        </HStack>
                                   </Link>
                         </Container>
                    ))
               }
               
          </Container> 
     {
         selector.folowingChatList.length === 0 &&
          <>
               <Box className='empty_list'>
                    <Box className='empty_list_img'></Box>
                    <Text color={'#112D4E'} as={'p'}>Folowing List</Text>
               </Box>
          </>
     }
</>
  )
}
