import { SearchIcon } from '@chakra-ui/icons'
import { Avatar, Heading, Text , Container, HStack, Box, Card, Divider, Input, InputGroup, InputRightElement} from '@chakra-ui/react'
import React from 'react'

export default function ChatList() {
  return (
    <Container className='ChatList' width={'md'} gap={'10px'} display={'flex'} flexDirection={'column'} mx={'20px'} py={'20px'}>
      <InputGroup>
          <InputRightElement pointerEvents='none'>
               <SearchIcon color='gray.300' />
               
          </InputRightElement>
          <Input className="searchBar-chat" placeholder='search'/>
     </InputGroup>

     <Container className="ChatList-cont">
          <Container width={'100%'} >
               <Divider />
               <HStack className="list-item">
                    <Avatar size={'md'} name='Dan Abrahmov' src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png' />
                    <Box className="item-detailes" display={'flex'} flexDirection={'column'} alignItems={'flex-start'}  marginLeft={'10px'} >
                         <Heading as={'h5'} fontSize={'medium'}  className='name'>Dan Abrahmov</Heading>
                         <Text className='item-cont' textAlign={'left'} >Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Text>
                    </Box>
               </HStack>
          </Container>
          <Container width={'100%'} >
               <Divider />
               <HStack className="list-item">
                    <Avatar size={'md'} name='Dan Abrahmov' src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png' />
                    <Box className="item-detailes" display={'flex'} flexDirection={'column'} alignItems={'flex-start'}  marginLeft={'10px'} >
                         <Heading as={'h5'} fontSize={'medium'}  className='name'>Dan Abrahmov</Heading>
                         <Text className='item-cont' textAlign={'left'} >Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Text>
                    </Box>
               </HStack>
          </Container>
          <Container width={'100%'} >
               <Divider />
               <HStack className="list-item">
                    <Avatar size={'md'} name='Dan Abrahmov' src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png' />
                    <Box className="item-detailes" display={'flex'} flexDirection={'column'} alignItems={'flex-start'}  marginLeft={'10px'} >
                         <Heading as={'h5'} fontSize={'medium'}  className='name'>Dan Abrahmov</Heading>
                         <Text className='item-cont' textAlign={'left'} >Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Text>
                    </Box>
               </HStack>
          </Container>
          <Container width={'100%'} >
               <Divider />
               <HStack className="list-item">
                    <Avatar size={'md'} name='Dan Abrahmov' src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png' />
                    <Box className="item-detailes" display={'flex'} flexDirection={'column'} alignItems={'flex-start'}  marginLeft={'10px'} >
                         <Heading as={'h5'} fontSize={'medium'}  className='name'>Dan Abrahmov</Heading>
                         <Text className='item-cont' textAlign={'left'} >Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Text>
                    </Box>
               </HStack>
          </Container>
          <Container width={'100%'} >
               <Divider />
               <HStack className="list-item">
                    <Avatar size={'md'} name='Dan Abrahmov' src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png' />
                    <Box className="item-detailes" display={'flex'} flexDirection={'column'} alignItems={'flex-start'}  marginLeft={'10px'} >
                         <Heading as={'h5'} fontSize={'medium'}  className='name'>Dan Abrahmov</Heading>
                         <Text className='item-cont' textAlign={'left'} >Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Text>
                    </Box>
               </HStack>
          </Container>
          <Container width={'100%'} >
               <Divider />
               <HStack className="list-item">
                    <Avatar size={'md'} name='Dan Abrahmov' src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png' />
                    <Box className="item-detailes" display={'flex'} flexDirection={'column'} alignItems={'flex-start'}  marginLeft={'10px'} >
                         <Heading as={'h5'} fontSize={'medium'}  className='name'>Dan Abrahmov</Heading>
                         <Text className='item-cont' textAlign={'left'} >Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Text>
                    </Box>
               </HStack>
          </Container>
          <Container width={'100%'} >
               <Divider />
               <HStack className="list-item">
                    <Avatar size={'md'} name='Dan Abrahmov' src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png' />
                    <Box className="item-detailes" display={'flex'} flexDirection={'column'} alignItems={'flex-start'}  marginLeft={'10px'} >
                         <Heading as={'h5'} fontSize={'medium'}  className='name'>Dan Abrahmov</Heading>
                         <Text className='item-cont' textAlign={'left'} >Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Text>
                    </Box>
               </HStack>
          </Container>
     </Container>
      
      
    </Container>
  )
}
