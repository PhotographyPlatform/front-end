import { Box, Button, Text,Heading } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Section_Five() {
  return (
     <Box className='Section_Five_main'>
     <Box className='Section_Five_cont'>
          <Box className='Section_Five_heading'>
               <Heading as={'h2'}>Designed and built for photographers</Heading>
               <Text>Create your own high-quality website in minutes. Portfolios allows you to share your work externally so you can build your own brand and market yourself as a professional photographer.</Text>
               <Link to={'signup'}>
                    <Button as={'button'}><span className='Get_Started_Five'>Get Started</span></Button>
               </Link>
          </Box>
          <Box className='Section_Five_img' backgroundImage={'https://500px.com/staticV2/media/desktop_portfolio.fdf6ee3e.png'}></Box>
     </Box>
   </Box>
  )
}
