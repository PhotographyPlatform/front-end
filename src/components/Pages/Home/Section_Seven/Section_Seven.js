import { Box, Button, Heading, Icon, Text } from '@chakra-ui/react'
import { GiTrophyCup } from 'react-icons/gi';
import { Link } from 'react-router-dom';

export default function Section_Seven() {
  return (
    <Box className='Section_Seven_main'>
      <Box className='Section_Seven_cont'>
          <Box className='Section_Seven_icon'>
               <Icon fontSize={'80px'} as={GiTrophyCup} />
               <Heading as={'h2'}>Take photos. Win prizes.</Heading>
               <Text as={'p'}>Quests are creative photo challenges that encourage you to test your skills and submit your best work for a chance to win exciting prizes. We launch new Quests with unique themes every week so there is always something for everyone!</Text>
               <Link to={'/'}>
                    <Button as={'button'}><span className='sign-up-home'>Challenges</span></Button>
               </Link>
          </Box>
          <Box  className='Section_Seven_img_cont'>
               <Box className='Section_Seven_img' backgroundImage={'https://500px.com/staticV2/media/loh_quests@2x.c67b91f0.png'}></Box>
          </Box>
      </Box>
    </Box>
  )
}
