import ViewPost from '../../../Pages/Post/ViewPost';
import { useDisclosure } from '@chakra-ui/react';
import './Post.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';


//props
//{ id, imgurl, userid, title, contant, challengeName, challengeID, category, createdAt, updatedAt }

function Post(props) {
console.log(props);

  const { id, imgurl, userid, title, contant, challengeName, challengeID, category, createdAt, updatedAt, } = props;
  const { isOpen: isOpenViewPost, onOpen: onOpenViewPost, onClose: onCloseViewPost } = useDisclosure();

  const [userImg, setUserImg] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/v1/newUserCOll/${userid}`
        );
        setUsername(response.data.data.username);
        setUserImg(response.data.data.img);
      } catch (e) {
        console.log("fetching challenges error: ", e);
      }
    }
    fetchData()
  }, []);

  return (
    <div className='post' onClick={onOpenViewPost} >
      <ViewPost
        isOpenViewPost={isOpenViewPost}
        onCloseViewPost={onCloseViewPost}
        id={id}

      />

      <img src={'https://images.pexels.com/photos/2760519/pexels-photo-2760519.jpeg?auto=compress&cs=tinysrgb&w=600'} alt='imgURL' />
      <div className='post-owner'>
        <img className='user-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAtvidMKTs5qN2qy-R6jZecNuIDMKl4D63ZYoV7jw5o5lcnqexlyqMoi5OXbcBvliAiQg&usqp=CAU' alt='profilePicture' onClick={() => console.log(userid, 'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')} />
        <p className='username'>{username}</p>
      </div>
    </div >

  )
}

export default Post