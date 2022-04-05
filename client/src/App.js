import React from 'react'
import CreatePosts from './CraetePosts'
import PostList from './PostList'

export const App = () => {
  return (
    <div className='container'>
        <CreatePosts/>
        <PostList/>
    </div>
  )
}
