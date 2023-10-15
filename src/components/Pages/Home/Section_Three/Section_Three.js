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

export default function Section_Three() {
  return (
     <Box className='Section_Three_main'>
     <Box className='Section_Three_cont'>
         <Box className='Section_Three_Heading'>
              <Heading as={'h1'}>The best of the best.</Heading>
              <Text as={'p'}>Our editors are always on the lookout for jaw dropping content for you to discover and stay inspired. Check back weekly to see what’s new.</Text>
         </Box>
         <Box className='Section_Three_Photos'>
               <Box className='Section_Three_Photos_1'>
                    <Box as={'div'} backgroundImage={img1}></Box>
                    <Box as={'div'} backgroundImage={img2}></Box>
                    <Box as={'div'} backgroundImage={img3}></Box>
                    <Box as={'div'} backgroundImage={img4}></Box>
               </Box>
               <Box className='Section_Three_Photos_1'>
                    <Box as={'div'} backgroundImage={img5}></Box>
                    <Box as={'div'} backgroundImage={img6}></Box>
                    <Box as={'div'} backgroundImage={img7}></Box>
                    <Box as={'div'} backgroundImage={img8}></Box>
               </Box>
         </Box>
         
     </Box>
   </Box>
  )
}
