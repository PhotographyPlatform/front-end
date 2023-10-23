import ViewPost from '../../../Pages/Post/ViewPost';
import { useDisclosure } from '@chakra-ui/react';
import './Post.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CalculateTime from '../../Time';
const baseUrl = process.env.REACT_APP_URL;

//props
//{ id, imgurl, userid, title, contant, challengeName, challengeID, category, createdAt, updatedAt }

function Post(props) {
  console.log(props);


  const { id, imgurl, userid, title, contant, challengeName, challengeID, category, createdAt, updatedAt, } = props;
  const { isOpen: isOpenViewPost, onOpen: onOpenViewPost, onClose: onCloseViewPost } = useDisclosure();

  const [userImg, setUserImg] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {

    try {
      if (userid) {
        const response = axios.get(
          `${baseUrl}/v1/newUserCOll/${userid}`
        );
        response.then((data) => {
          setUsername(data.data.data.username);
          setUserImg(data.data.data.img);
        });
      }

    } catch (e) {
      console.log("fetching challenges error: ", e);
    }

  }, []);

  return (
    <div className='post' onClick={onOpenViewPost} >
      <ViewPost
        isOpenViewPost={isOpenViewPost}
        onCloseViewPost={onCloseViewPost}
        id={id}

      />

      <img src={imgurl} alt='imgURL' />
      <div className='post-owner'>
        <img className='user-img' src={userImg} alt='profilePicture' onClick={() => console.log(userid, 'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')} />
        <p className='username'>{username}</p>
        <div className='post-time'>
          <CalculateTime createdAt={createdAt} />
        </div>



      </div>
    </div >

  )
}

export default Post