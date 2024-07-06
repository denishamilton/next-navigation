import Link from "next/link";
import Post from "../../components/Post";
import axios from "axios";

const fetchPost = async (postId) => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return res.data;
};

export async function generateMetadata({ params }) {
  const post = await fetchPost(params.postId);
  return {
    title: post.title,
    description: post.body.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.body.slice(0, 160),
    },
  };
}

export async function generateStaticParams() {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  const posts = res.data;
  return posts.map((post) => ({
    postId: post.id.toString(),
  }));
}

export default async function PostId({ params }) {
  const post = await fetchPost(params.postId);
  return (
    <div>
      <Post post={post} />
    </div>
  );
}
