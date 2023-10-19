import './Home.scss'
import Hero from './Hero/Hero'
import Section_one from './Section_one/Section_one'
import Section_Two from './Section_Two/Section_Two'
import Section_Three from './Section_Three/Section_Three'
import { Box } from '@chakra-ui/react'
import Footer from './Footer/Footer'
import Section_Four from './Section_Four/Section_Four'
import Section_Five from './Section_Five/Section_Five'
import Section_Six from './Section_Six/Section_Six'
import Section_Seven from './Section_Seven/Section_Seven'
import Section_Eight from './Section_Eight/Section_Eight'

export default function Home() {
  return (
    <Box className='home-page'>
      <Hero />
      <Section_one/>
      <Section_Two/>
      <Section_Three />
      <Section_Four/>
      <Section_Five/>
      <Section_Six/>
      <Section_Seven/>
      <Section_Eight/>
    </Box>
  )
}