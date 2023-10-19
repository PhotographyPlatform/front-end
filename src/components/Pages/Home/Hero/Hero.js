import { Box, Heading ,Text , Button} from '@chakra-ui/react'
import './Hero.scss'
import { Link } from 'react-router-dom'
import Header_Inhansed from '../../Header_Inhansed/Header_Inhansed'

export default function Hero() {

  return (
    <Box className='hero-main'>
      <Header_Inhansed color={'white'} bg = {'#29383b'} />
      <Box className='hero-cont' width={{base : '95%' , md : '80%' , lg : '75%' ,xl : '60% '}}>
        <Box className='hero-content' width={{base : '95%' , md : '80%' , lg : '75%' ,xl : '70% '}}>
          <Heading as={'h2'} fontSize={{base : '25px' , 'md' : '30' , 'lg' : '35px'  ,'xl' : '40px '}}>Discover and share the world’s best photos</Heading>
          <Text as={'p'}>Get inspired with incredible photos from diverse styles and genres around the world. We're not guided by fads—just great photography.</Text>
          <Link to={'signup'}>
            <Button as={'button'}><span className='sign-up-home'>Sign Up</span></Button>
          </Link>
        </Box>
      </Box>
   </Box>
  )
}
