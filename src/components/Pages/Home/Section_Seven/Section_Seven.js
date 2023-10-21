import { Box, Button, Heading, Icon, Text } from '@chakra-ui/react'
import { Fade } from 'react-awesome-reveal';
import { GiTrophyCup } from 'react-icons/gi';
import { Link } from 'react-router-dom';

export default function Section_Seven() {
  return (
    <Box className='Section_Seven_main'>
      <Box className='Section_Seven_cont'>

        <Box className='Section_Seven_icon'
          alignItems={{ base: 'center', 'sm': 'center', 'lg': 'start', 'xl': 'start' }}
          w={{ base: '350px', 'sm': '480px', 'lg': '500px', 'xl': '600px ' }}>
          <Fade triggerOnce duration={1000} direction='left'>
            <Icon fontSize={{ base: '55px', 'sm': '60px', 'lg': '70px', 'xl': '80px' }}
              as={GiTrophyCup} />
            <Heading as={'h2'} fontSize={{ base: '30px', 'md': '35px', 'lg': '38px', 'xl': '40px ' }}>Take photos. Win prizes.</Heading>
            <Text as={'p'}
              fontSize={{ base: '15px', 'md': '16px', 'lg': '18px', 'xl': '18px ' }}
              textAlign={{ base: 'center', 'sm': 'center', 'lg': 'start', 'xl': 'start' }}
            >Quests are creative photo challenges that encourage you to test your skills and submit your best work for a chance to win exciting prizes. We launch new Quests with unique themes every week so there is always something for everyone!</Text>
            <Link to={'/'}>
              <Button
                w={{ base: '150px', 'sm': '180px', 'lg': '200px', 'xl': '200px ' }}
                h={{ base: '50px', 'sm': '55px', 'lg': '60px', 'xl': '60px ' }}
                fontSize={{ base: '21px', 'sm': '21px', 'lg': '24px', 'xl': '24px' }}
                as={'button'}><span className='sign-up-home'>Challenges</span></Button>
            </Link>
          </Fade>
        </Box>

        <Fade duration={1000} direction='right' triggerOnce>

          <Box className='Section_Seven_img_cont'
            w={{ base: '350px', 'sm': '480px', 'md': '480px', 'lg': '580px', 'xl': '600px ' }}
            h={{ base: '200px', 'sm': '350px', 'md': '380px', 'lg': '480px', 'xl': '500px ' }}
          >
            <Box className='Section_Seven_img' backgroundImage={'https://images.pexels.com/photos/2228741/pexels-photo-2228741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}></Box>
          </Box>

        </Fade>

      </Box>
    </Box>
  )
}
