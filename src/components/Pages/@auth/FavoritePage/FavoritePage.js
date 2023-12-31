import { Avatar, Box, Divider, Heading, Icon, Text, useStatStyles } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import './favoritePage.scss'
import { AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { addFavoritePost, fetchFavoritePosts, removeFavorite } from '../../../../store/reducers/favorite/favorite'
import cookie from 'react-cookies';
import axios from 'axios'
import Posts from '../../../components/posts'
import { BsBookmark } from 'react-icons/bs';
import { GiDividedSquare } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import MainFooter from '../../Footer'


export default function FavoritePage() {
     const dispatch = useDispatch()
     const selector = useSelector(state => state.Favorite)
     const cookieData = cookie.load('user_session')
     const favIcon = useRef(null)
     const [userInfo, setUserInfo] = useState('')
     const URL = process.env.REACT_APP_URL;


     const handelFavorite = (id) => {
          const filter = selector.favoritePosts.filter(ele => {
               if (ele) return ele.id === id
          })
          console.log(filter);
          if (filter) {
               dispatch(removeFavorite(id))
               if (favIcon.current) favIcon.current.classList.remove('Active')
          }
          if (!filter) {
               dispatch(addFavoritePost(id))
               if (favIcon.current) favIcon.current.classList.add('Active')
          }
     }
     const getOtherUserData = async (id) => {
          try {

               const res = await axios.get(`${URL}/getOtherDataUser/${id}`, { headers: { Authorization: `Bearer ${cookieData}` } })
               setUserInfo(res.data.userInfo.username)
               return

          } catch (err) {
               console.log(err);
          }
     }

     useEffect(() => {
          dispatch(fetchFavoritePosts())
     }, [])



     const filteredFavoritePosts = selector.favoritePosts.filter((item) => item !== null && item !== undefined);

     return (
          <div>
               <div className='favoritePage'>
                    {filteredFavoritePosts.length === 0 ? (
                         <div className='fav-empty'>
                              <BsBookmark size={150} />
                              <p>
                                   You don't have any favorites yet. Start adding some posts to your favorites!
                              </p>
                              <p className="search-link">

                                   <Link to="/search" > Discover &rarr;</Link>
                              </p>
                         </div>
                    ) : (
                         <Posts posts={filteredFavoritePosts} />
                    )}
               </div>
               <MainFooter />
          </div>
     )
}



// {/* <Divider borderBottomWidth={'3px'} borderColor={'#00000040'} marginTop={'5px'} />
//                     <Box className='favoriteItems' justifyContent={{ base: 'center', xl: 'center' }}>
//                          {
//                               selector.favoritePosts &&
//                               selector.favoritePosts.map(ele => (
//                                    ele &&
//                                    <Box key={ele.id} className='favoriteItem' backgroundImage={'https://drscdn.500px.org/photo/1077696107/q%3D80_m%3D2000_k%3D1/v2?sig=64038fc06f74fc6e7dbd614004cb01b59e3f080f0ebf043767b02b66449fbd94'}>
//                                         <Box className='favTitle'>{ele.title}</Box>

//                                         <Box className='favInteraction'>
//                                              <Box className='favUsername'>
//                                                   <Avatar size={'sm'} src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png' />
//                                                   <Text as={'p'}>username</Text>
//                                              </Box>
//                                              <Box className='favIcons'>
//                                                   <Box className='favIcon' >
//                                                        <Icon title='Like' as={AiOutlineHeart} fontSize={'25px'} />
//                                                   </Box>
//                                                   <Box className='favIcon'>
//                                                        <Icon title='Comment' as={FaRegComment} fontSize={'20px'} />
//                                                   </Box>
//                                                   <Box ref={favIcon} className='favIcon'>
//                                                        <Icon title='Remove' onClick={() => handelFavorite(ele.id)} as={MdOutlineDeleteOutline} fontSize={'22px'} />
//                                                   </Box>
//                                              </Box>
//                                         </Box>
//                                    </Box>
//                               ))
//                          }
//                     </Box> */}