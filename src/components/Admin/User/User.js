import { Box, Heading, Input  ,Button, useToast} from '@chakra-ui/react'
import './user.scss'
import axios from 'axios';
import { useRef } from 'react';

export default function User() {
     const input = useRef(null)
     const url = 'http://localhost:3000'
     const toast = useToast()


     const handelDelete = async () => {
          try {
               toast({
                    title: 'User Deleted.',
                    description: "The User Has Been Deleted",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'bottom-right',

               })

               await axios.delete(`${url}/${input.current.value}`)
          } catch (err) {
               console.log(err);
          }
     }

  return (
    <Box className='adminUserMain'>
     <Box className='adminUserContainer'>
          
          <Box className='adminUsertext'>
               <Heading>Users</Heading>
          </Box>
          
          <Box className='adminUserinput'>
               <Box className='admin-user-input'>
                    <Input ref={input} placeholder={'UserID'}/>
               </Box>
               <Box className='admin-user-btn'>
                    <Button onClick={handelDelete}>DELETE</Button>
               </Box>
          </Box>  
          
     </Box>
    </Box>
  )
}

