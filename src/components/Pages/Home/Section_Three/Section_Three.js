import { Box, Text,Heading } from '@chakra-ui/react'
import React from 'react'
import img1 from './photos/pexels-anh-nguyen-16961107.jpg'
import img2 from './photos/pexels-annaëlle-quionquion-18076253.jpg'
import img3 from './photos/pexels-justin-wolfert-14573746.jpg'
import img4 from './photos/pexels-kübra-zehra-16983649.jpg'
import img5 from './photos/pexels-miguel-andres-parra-15007753.jpg'
import img6 from './photos/pexels-morteza-ghanbari-18766071.jpg'
import img7 from './photos/pexels-elina-volkova-18403914.jpg'
import img8 from './photos/pexels-justus-menke-5732892.jpg'
import { Fade  , Zoom , Bounce} from "react-awesome-reveal";
import 'animate.css';


export default function Section_Three() {
     let width = { base: '180px' , 'md': '200px' , 'lg': '250px'  , 'xl': '250px '}
     let height = { base: '280px', 'md' : '300px', 'lg' : '350px', 'xl' : '350px ' }


  return (
     <Box className='Section_Three_main'>
     <Box className='Section_Three_cont'>
         <Fade>
               <Box className='Section_Three_Heading'>
                    <Heading as={'h1'}>The best of the best.</Heading>
                    <Text as={'p'}>Our editors are always on the lookout for jaw dropping content for you to discover and stay inspired. Check back weekly to see what’s new.</Text>
               </Box>
         </Fade>
          
         {/* <Box className='Section_Three_Photos'> */}
               <Zoom delay={0} cascade triggerOnce>
                    <Box className='Section_Three_Photos_1'>
                              <Box backgroundImage={img1}></Box>
                              <Box as={'div'} backgroundImage={img2}></Box>
                              <Box as={'div'} backgroundImage={img3}></Box>
                              <Box as={'div'} backgroundImage={img4}></Box>
                              <Box as={'div'} backgroundImage={img5}></Box>
                              <Box as={'div'} backgroundImage={img6}></Box>
                              <Box as={'div'} backgroundImage={img7}></Box>
                              <Box as={'div'} backgroundImage={img8}></Box>
                    </Box>
               </Zoom>
               {/* <Box className='Section_Three_Photos_1'>
                    <Zoom cascade delay={0} triggerOnce>
                         
                    <Box as={'div'} backgroundImage={img5}></Box>
                    <Box as={'div'} backgroundImage={img6}></Box>
                    <Box as={'div'} backgroundImage={img7}></Box>
                    <Box as={'div'} backgroundImage={img8}></Box>
                    </Zoom>
               </Box> */}
         {/* </Box> */}
     </Box>
   </Box>
  )
}
