import { Box, Heading, Icon } from '@chakra-ui/react'
import { BsFillBagCheckFill } from 'react-icons/bs';

export default function Section_Four() {
  return (
    <Box className='Section_Four_main'>
      <Box className='Section_Four_cont'>
          <Box className='Section_Four_icon'>
               <Icon as={BsFillBagCheckFill} />
          </Box>
          <Box className='Section_Four_Heading'>
               <Heading as={'h1'}>Portfolio</Heading>
          </Box>
      </Box>
    </Box>
  )
}
