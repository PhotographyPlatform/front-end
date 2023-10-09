import './Post.scss';

function Post({id, imgurl, userid, title, contant, challengeName, challengeID, category, createdAt, updatedAt}) {
  return (
    <div className='post'>
      <img src={'https://images.pexels.com/photos/2760519/pexels-photo-2760519.jpeg?auto=compress&cs=tinysrgb&w=600'} alt='imgURL'/>
    </div>
  )
}

export default Post