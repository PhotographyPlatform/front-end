import { Box, Heading, Icon } from '@chakra-ui/react'
import { GiRibbonMedal } from 'react-icons/gi';

export default function Section_Two() {
  return (
    <Box className='Section_Two_main'>
      <Box className='Section_Two_cont'>
          <Box className='Section_Two_icon'>
               <Icon as={GiRibbonMedal} />
          </Box>
          <Box className='Section_Two_Heading'>
               <Heading as={'h1'}>Editors’ Choice</Heading>
          </Box>
      </Box>
    </Box>
  )
}
