// posts/[postId]/page.js

import Link from "next/link";
import Post from "../../components/Post";

export async function generateMetadata({ params }) {
    const post = await fetchPost(params.postId);
  
    return {
      title: post.title,
      description: post.body.slice(0, 160), // Example: Use the first 160 characters of the post body
      openGraph: {
        title: post.title,
        description: post.body.slice(0, 160),
      },
    };
  }

// export async function generateMetaData({ params, searchParams }) {
//     const post = await fetch(params.postId);
//     return {
//       title: post.title,
//       description: post.body
//     }
// }

const fetchPost = async (postId) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const result = await res.json();
    return result;
  }
   
  export default async function PostId({ params }) {
    const post = await fetchPost(params.postId);
  
    return (
      <div>
        <Post post={post}/>
      </div>
    );
  }
  