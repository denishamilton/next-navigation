import Link from "next/link";
import axios from "axios";

export async function generateMetadata() {
  return { title: 'Posts' };
}

export const fetchData = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return res.data;
}

export default async function Posts() {
  const res = await fetchData();
  return (
    <div>
      <Link href="/"> - To Home</Link>
      <h1> Posts </h1>
      <div className="posts">
        {res.map((post) => (
          <div style={{ border: '1px solid white', padding: '10px', margin: '10px' }} className="post" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <Link href={`/posts/${post.id}`}>Read more</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
