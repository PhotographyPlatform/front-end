import { Box, Heading, Icon } from '@chakra-ui/react'
import { GoGoal } from 'react-icons/go';

export default function Section_Six() {
  return (
    <Box className='Section_Six_main'>
      <Box className='Section_Six_cont'>
          <Box className='Section_Six_icon'>
               <Icon as={GoGoal} />
          </Box>
          <Box className='Section_Six_Heading'>
               <Heading as={'h1'}>Challenges</Heading>
          </Box>
      </Box>
    </Box>
  )
}
