import React from 'react'
import './Users.scss';

function Users({ username, profilePic, id, handler }) {

  return (
    <div className='users' onClick={() => { handler(id) }}>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAtvidMKTs5qN2qy-R6jZecNuIDMKl4D63ZYoV7jw5o5lcnqexlyqMoi5OXbcBvliAiQg&usqp=CAU' alt='profilePicture' />
      <p>{username}</p>
    </div>
  )
}

export default Users