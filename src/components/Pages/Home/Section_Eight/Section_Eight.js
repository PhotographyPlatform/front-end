import { Box, Button, Heading, Icon, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function Section_Eight() {
  return (
     <>
     
          <Box className='Section_Eight_main'>
               <Box 
               w={{ base: '90%', 'sm' :  '80%' , 'lg': '65%', 'xl': '60%' }}  
               className='Section_Eight_icon'>
                    <Heading as={'h2'}
                    fontSize={{base : '20px' , 'sm' : '22px' , 'md' : '28px' , 'lg' : '32px'  ,'xl' : '35px '}}
                    >Join our community today</Heading>
                    <Text as={'p'}>Do you love photography? Want to constantly stay inspired and be surrounded by millions of like-minded creators? Then sign-up today and get rewarded for your love of photography.</Text>
                    <Link to={'/'}>
                           <Button
                                w={{ base: '150px', 'sm' :  '180px' , 'lg': '200px', 'xl': '200px ' }}  
                                h={{base : '50px', 'sm' : '55px'  , 'lg' : '60px'  ,'xl' : '60px '}}
                                fontSize={{base : '21px', 'sm' : '21px'  , 'lg' : '24px'  ,'xl' : '24px'}}
                                variant='ghost' as={'button'}><span className='sign-up-home'>Sign Up</span></Button>
                    </Link>
               </Box>
               <Footer/>
          </Box>
     </>


  )
}
