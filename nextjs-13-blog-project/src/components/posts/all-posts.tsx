import PostsGrid from './posts-grid';
import classes from './all-posts.module.css';
import { getAllPosts } from '@helper/post-util';

export default function AllPosts() {
  const posts = getAllPosts();

  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
}
