import { Box, Heading, Icon } from '@chakra-ui/react'
import { BsFillBagCheckFill } from 'react-icons/bs';

export default function Section_Four() {
  return (
    <Box className='Section_Four_main' h={{base : '300px' , lg : '350px' , 'md' : '350px' , 'xl' : '400px '}}>
      <Box className='Section_Four_cont'>
          <Box className='Section_Four_icon' w={{base : '80px' , 'md' : '90px' , 'lg' : '90px'  ,'xl' : '100px '}} h={{base : '80px' , 'md' : '90px' , 'lg' : '90px'  ,'xl' : '100px '}}>
               <Icon as={BsFillBagCheckFill} fontSize={{base : '55px' , 'md' : '55' , 'lg' : '60px'  ,'xl' : '70px '}} />
          </Box>
          <Box className='Section_Four_Heading'>
               <Heading as={'h1'} fontSize={{base : '20px' , 'md' : '30' , 'lg' : '45px'  ,'xl' : '50px '}}>Portfolio</Heading>
          </Box>
      </Box>
    </Box>
  )
}
