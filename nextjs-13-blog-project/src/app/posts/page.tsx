import AllPosts from '@components/posts/all-posts';

export const metadata = {
  title: 'All Posts',
  description: 'Showing all the posts',
};

export default async function AllPostsPage() {
  return <AllPosts />;
}
