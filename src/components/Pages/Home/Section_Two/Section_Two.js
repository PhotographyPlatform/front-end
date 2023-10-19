import { Box, Heading, Icon } from '@chakra-ui/react'
import { GiRibbonMedal } from 'react-icons/gi';

export default function Section_Two() {
  return (
    <Box className='Section_Two_main' h={{base : '300px' , 'md' : '350px' , 'xl' : '400px '}}>
      <Box className='Section_Two_cont'>
          <Box className='Section_Two_icon' w={{base : '80px' , 'md' : '90px' , 'lg' : '90px'  ,'xl' : '100px '}} h={{base : '80px' , 'md' : '90px' , 'lg' : '90px'  ,'xl' : '100px '}} >
               <Icon as={GiRibbonMedal} fontSize={{base : '55px' , 'md' : '55' , 'lg' : '60px'  ,'xl' : '70px '}} />
          </Box>
          <Box className='Section_Two_Heading'>
               <Heading as={'h1'} fontSize={{base : '20px' , 'md' : '30' , 'lg' : '45px'  ,'xl' : '50px '}}>Editors’ Choice</Heading>
          </Box>
      </Box>
    </Box>
  )
}
