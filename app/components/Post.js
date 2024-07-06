import React from 'react'
import Link from 'next/link'

const Post = ({post}) => {
  return (
    <div className="post">
    <h1>Post - {post.id} - {post.title}</h1>
    <p>{post.body}</p>
    <Link href="/posts">- Back</Link>
    </div>
  )
}

export default Post