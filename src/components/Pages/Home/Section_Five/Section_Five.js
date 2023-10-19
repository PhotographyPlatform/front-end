import { Box, Button, Text,Heading } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Fade } from "react-awesome-reveal";
// import 'animate.css';


export default function Section_Five() {
  return (
     <Box className='Section_Five_main'>
            <Box className='Section_Five_cont'>
               <Box className='Section_Five_heading' w={{base : '100%' , 'md' : '90%' , 'lg' : '85%'  ,'xl' : '70% '}}>
                    <Fade  duration={1000}>
                              <Heading fontSize={{base : '20px' , 'md' : '25px' , 'lg' : '28px'  ,'xl' : '30px '}} as={'h2'}>Designed and built for photographers</Heading>
                              <Text>Create your own high-quality website in minutes. Portfolios allows you to share your work externally so you can build your own brand and market yourself as a professional photographer.</Text>
                              <Link to={'signup'}>
                                <Button
                                      w={{ base: '150px', 'sm' :  '180px' , 'lg': '200px', 'xl': '200px ' }}  
                                      h={{base : '50px', 'sm' : '55px'  , 'lg' : '60px'  ,'xl' : '60px '}}
                                      fontSize={{base : '21px', 'sm' : '21px'  , 'lg' : '24px'  ,'xl' : '24px '}}
                                     className='five_btn' as={'button'}><span className='Get_Started_Five'>Get Started</span></Button>
                              </Link>
                    </Fade>
               </Box>
               <Fade duration={2000}>
                      <Box
                         //   w={{ base: '500px', 'md': '600px', 'lg': '650px', 'xl': '650px ' }}  
                         //   h={{base : '150px','md': '250px' , 'lg' : '300px'  ,'xl' : '300px '}}
                           w={{ base: '350px', 'sm' :  '480px' ,'md': '600px', 'lg': '650px', 'xl': '650px ' }}  
                           h={{base : '200px', 'sm' : '250px' ,'md': '350px' , 'lg' : '300px'  ,'xl' : '300px '}}
                           className='Section_Five_img' backgroundImage={'https://500px.com/staticV2/media/desktop_portfolio.fdf6ee3e.png'}></Box>
               </Fade>
     </Box>
   </Box>
  )
}
