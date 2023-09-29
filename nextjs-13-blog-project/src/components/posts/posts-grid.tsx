import classes from './posts-grid.module.css';
import PostItem from './post-item';
import { Post } from '@app-types/posts';

export default function PostsGrid({ posts }: { posts: Post[]}) {
  return (
    <ul className={classes.grid}>
      {
        posts.map(post => <PostItem key={post._id} post={post}/>)
      }
    </ul>
  );
}