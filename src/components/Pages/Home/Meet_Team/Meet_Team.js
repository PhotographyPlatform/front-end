import { Box, Heading, Icon, Image, Text  , Link} from '@chakra-ui/react'
import React from 'react'
import ehab from '../Hero/assets/pexels-julia-larson-6456264.jpg'
import { Fade } from 'react-awesome-reveal'
import { ImLinkedin } from 'react-icons/im';
import { LinkIcon } from '@chakra-ui/icons';


export default function Meet_Team() {
  return (
    <Box className='Meet_Team_main'>
      <Box className='Meet_Team_cont'>
          
          <Box className='Meet_Team_heading'>
               <Heading>Meet Our Team</Heading>
               <Text>- WE ARE STRONGER -</Text>
          </Box>
          
          <Box className='Meet_Team_cards'>
               <Box className='Meet_Team_card'>
                    <Image src={ehab } />
                    <Box className='member_caption_cont'>
                         <Box className='member_caption'>
                              <Fade direction='left'>
                                   <Heading as={'h4'}>Ihab Salhi</Heading>
                              </Fade>
                              <Fade cascade direction='down' >
                                   <Text as={'h4'}>Web Developer</Text>
                                   <Box className='member_caption_icon'>
                                        <Link href='https://www.linkedin.com/in/ehab-s-221336107/' >
                                             <LinkIcon fontSize={'25px'} as={ImLinkedin } />
                                        </Link>
                                   </Box>
                              </Fade>
                         </Box>
                    </Box>
               </Box>
               <Box className='Meet_Team_card'>
                    <Image src={ehab } />
                    <Box className='member_caption_cont'>
                         <Box className='member_caption'>
                              <Fade direction='left'>
                                   <Heading as={'h4'}>Ihab Salhi</Heading>
                              </Fade>
                              <Fade cascade direction='down' >
                                   <Text as={'h4'}>Web Developer</Text>
                                   <Box className='member_caption_icon'>
                                        <Link href='https://www.linkedin.com/in/ehab-s-221336107/' >
                                             <LinkIcon fontSize={'25px'} as={ImLinkedin } />
                                        </Link>
                                   </Box>
                              </Fade>
                         </Box>
                    </Box>
               </Box>
               <Box className='Meet_Team_card'>
                    <Image src={ehab } />
                    <Box className='member_caption_cont'>
                         <Box className='member_caption'>
                              <Fade direction='left'>
                                   <Heading as={'h4'}>Ihab Salhi</Heading>
                              </Fade>
                              <Fade cascade direction='down' >
                                   <Text as={'h4'}>Web Developer</Text>
                                   <Box className='member_caption_icon'>
                                        <Link href='https://www.linkedin.com/in/ehab-s-221336107/' >
                                             <LinkIcon fontSize={'25px'} as={ImLinkedin } />
                                        </Link>
                                   </Box>
                              </Fade>
                         </Box>
                    </Box>
               </Box>
               <Box className='Meet_Team_card'>
                    <Image src={ehab } />
                    <Box className='member_caption_cont'>
                         <Box className='member_caption'>
                              <Fade direction='left'>
                                   <Heading as={'h4'}>Ihab Salhi</Heading>
                              </Fade>
                              <Fade cascade direction='down' >
                                   <Text as={'h4'}>Web Developer</Text>
                                   <Box className='member_caption_icon'>
                                        <Link href='https://www.linkedin.com/in/ehab-s-221336107/' >
                                             <LinkIcon fontSize={'25px'} as={ImLinkedin } />
                                        </Link>
                                   </Box>
                              </Fade>
                         </Box>
                    </Box>
               </Box>
          </Box>
          
      </Box>
    </Box>
  )
}
