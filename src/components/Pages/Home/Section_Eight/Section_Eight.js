import { Box, Button, Heading, Icon, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function Section_Eight() {
  return (
     <>
          <Box className='Section_Eight_main'>
               <Box className='Section_Eight_icon'>
                    <Heading as={'h2'}>Join our community today</Heading>
                    <Text as={'p'}>Do you love photography? Want to constantly stay inspired and be surrounded by millions of like-minded creators? Then sign-up today and get rewarded for your love of photography.</Text>
                    <Link to={'/'}>
                         <Button  variant='ghost' as={'button'}><span className='sign-up-home'>Sign Up</span></Button>
                    </Link>
               </Box>
               <Footer/>
          </Box>
     </>


  )
}
