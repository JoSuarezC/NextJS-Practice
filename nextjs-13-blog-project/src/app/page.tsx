import Hero from '@components/homepage/hero';
import FeaturedPosts from '@components/homepage/featured-posts';
import { getFeaturedPosts } from '@helper/post-util';

export default function Home() {
  const posts = getFeaturedPosts();

  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}