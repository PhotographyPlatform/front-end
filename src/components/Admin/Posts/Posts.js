import { Box, Heading, Input  ,Button, useToast, Select} from '@chakra-ui/react'
import '../User/user.scss'
import axios from 'axios';
import { useRef } from 'react';
import cookie from 'react-cookies';



export default function AdminPosts() {
     const url = 'http://localhost:3002'
     const inputID = useRef(null)
     const selector = useRef(null)
     const toast = useToast()
     const cookieData = cookie.load('user_session')


     const toastHandelar = (action , fall) => {
          return  toast({
                   title: !fall ? `${action} Deleted.` : `Action falled` ,
                   description: fall ? `The action of deleting ${action} falled` : `The ${action} Has Been Deleted` ,
                   status: fall ? `error` :'success',
                   duration: 2000,
                   isClosable: true,
                   position: 'bottom-right',
              })
        }


     const handelDelete = async () => {
          let action = selector.current.value
          try {
               let id = inputID.current.value
               let coll = {
                    user: `newUserCOll`,
                    post: `newPostCOll`,
                    comment : `newCOmCOll`
               }
               let res = await axios.delete(`${url}/admin/${coll[action]}/${id}`, { headers: { Authorization: `Bearer ${cookieData}` } })
               if(res.status === 204) toastHandelar(action)
          } catch (err) {
               console.log(err);
               toastHandelar(action , true)
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
                    <Select className='selectGroup'  ref={selector} placeholder='Select option' mb={'15px'}>
                         <option value='user'>User</option>
                         <option value='post'>Post</option>
                         <option value='comment'>Comment</option>
                    </Select>
                    <Input ref={inputID} placeholder={'UserID'}/>
               </Box>
               <Box className='admin-user-btn'>
                    <Button onClick={handelDelete}>DELETE</Button>
               </Box>
          </Box>  
          
     </Box>
    </Box>
  )
}