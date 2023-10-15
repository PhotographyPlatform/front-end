import { Box, Heading, Icon,Text } from '@chakra-ui/react'
import '../Hero/Hero.scss'
import { GrGrow } from 'react-icons/gr';
import { BsBuildingAdd } from 'react-icons/bs';
import { TbDeviceDesktopAnalytics } from 'react-icons/tb';
import { FaCrown } from 'react-icons/fa';


export default function Section_one() {
  return (
    <Box className='Section_one-main'>
      <Box className='Section_one-cont'>
          <Box className='Section_one-heading'><Heading as={'h2'}>What makes us different</Heading></Box>
          <Box className='Section_one-cards'>
               <Box className='Section_one-card'>
                    <Icon as={GrGrow} fontSize={'60px'} />
                    <Heading as={'h2'}>Grow as a photographer</Heading>
                    <Text as={'p'}>Get immediate exposure with your first upload. Our Pulse algorithm surfaces new photographs and photographers, ensuring your photos are seen by the community so you receive valuable feedback on day one.</Text>
               </Box>
               <Box className='Section_one-card'>
                    <Icon as={BsBuildingAdd} fontSize={'60px'} />
                    <Heading as={'h2'}>Build your career</Heading>
                    <Text as={'p'}>Market yourself as a professional photographer. Show that you’re available for hire on your Profile and get discovered in Search results, showcase your articles, presents, videos, and more with Resources, and create a Portfolio website to showcase your work.</Text>
               </Box>
               <Box className='Section_one-card'>
                    <Icon as={TbDeviceDesktopAnalytics} fontSize={'60px'} />
                    <Heading as={'h2'}>See how you're performing</Heading>
                    <Text as={'p'}>With Statistics and Pulse you get valuable insights into how your photos are performing and how you rank in comparison to other photographers in the community.</Text>
               </Box>
               <Box className='Section_one-card'>
                    <Icon as={FaCrown} fontSize={'60px'} />
                    <Heading as={'h2'}>Sell your work</Heading>
                    <Text as={'p'}>Earn one of the highest royalty rates in the industry when you distribute your photography through 500px to a global marketplace, where buyers can view and purchase your work for commercial usage.</Text>
               </Box>
          </Box>
      </Box>
    </Box>
  )
}
