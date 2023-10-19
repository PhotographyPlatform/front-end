import { Box, Heading, Icon } from '@chakra-ui/react'
import { GoGoal } from 'react-icons/go';

export default function Section_Six() {
  return (
    <Box className='Section_Six_main'h={{base : '300px' , lg : '350px' , 'md' : '350px' , 'xl' : '400px '}}>
      <Box className='Section_Six_cont'>
          <Box className='Section_Six_icon' w={{base : '80px' , 'md' : '90px' , 'lg' : '90px'  ,'xl' : '100px '}} h={{base : '80px' , 'md' : '90px' , 'lg' : '90px'  ,'xl' : '100px '}}>
               <Icon as={GoGoal}  fontSize={{base : '55px' , 'md' : '55' , 'lg' : '60px'  ,'xl' : '60px '}}/>
          </Box>
          <Box className='Section_Six_Heading'>
               <Heading fontSize={{base : '20px' , 'md' : '30' , 'lg' : '45px'  ,'xl' : '50px '}} as={'h1'}>Challenges</Heading>
          </Box>
      </Box>
    </Box>
  )
}
