import { Box, Heading ,Text , Button} from '@chakra-ui/react'
import './Hero.scss'
import { Link } from 'react-router-dom'

export default function Hero() {

  return (
    <Box className='hero-main'>

      <Box className='hero-cont'>
        <Box className='hero-content'>
          <Heading as={'h2'}>Discover and share the world’s best photos</Heading>
          <Text as={'p'}>Get inspired with incredible photos from diverse styles and genres around the world. We're not guided by fads—just great photography.</Text>
          <Link to={'signup'}>
            <Button as={'button'}><span className='sign-up-home'>Sign Up</span></Button>
          </Link>
        </Box>
      </Box>
   </Box>
  )
}
