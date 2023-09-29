import PostsGrid from '../posts/posts-grid';
import classes from './featured-posts.module.css';
import { Post } from '@app-types/posts';

export default function FeaturedPosts({ posts }: { posts: Post[]}) {
  return (
    <section className={classes.latest}>
      <h2>Featured posts</h2>
      <PostsGrid posts={posts}/>
    </section>
  );
}