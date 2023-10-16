import ViewPost from '../../../Pages/Post/ViewPost';
import { useDisclosure } from '@chakra-ui/react';
import './Post.scss';


//props
//{ id, imgurl, userid, title, contant, challengeName, challengeID, category, createdAt, updatedAt }

function Post(props) {
  const { isOpen: isOpenViewPost, onOpen: onOpenViewPost, onClose: onCloseViewPost } = useDisclosure();
  return (
    <div className='post' onClick={onOpenViewPost} >
      <ViewPost
        isOpenViewPost={isOpenViewPost}
        onCloseViewPost={onCloseViewPost}
        data={{ ...props }}
        
      />

      <img src={'https://images.pexels.com/photos/2760519/pexels-photo-2760519.jpeg?auto=compress&cs=tinysrgb&w=600'} alt='imgURL' />
    </div >

  )
}

export default Post