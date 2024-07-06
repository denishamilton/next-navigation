// https://jsonplaceholder.typicode.com/posts

import Link from "next/link";

export async function generateMetadata() {
  return {
    title: 'Startseite',
  };
}

export default async function Home() {

  return (
    <div>
      <h1>Startseite</h1>
      <Link href="/posts"> - To Posts</Link>
    </div>
  );
}
