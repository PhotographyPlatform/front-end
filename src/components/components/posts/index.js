import './Posts.scss';
import Post from "./Post";
// import 





function Posts({ posts }) {
  console.log(posts)
  return (
    <div className='posts' >
      {posts && posts.map((item) => <Post key={item.id} id={item.id} imgurl={item.imgurl} userid={item.userid} title={item.title} contant={item.contant} challengeName={item.challengeName} challengeID={item.challengeID} category={item.category} createdAt={item.createdAt} updatedAt={item.updatedAt} />)}
    </div>
  );
}

export default Posts;
