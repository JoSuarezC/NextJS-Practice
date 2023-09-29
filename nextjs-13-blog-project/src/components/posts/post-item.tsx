import Image from 'next/image';
import classes from './post-item.module.css';
import Link from 'next/link';
import { Post } from '@app-types/posts';

export default function PostItem({ post }: { post: Post }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const imagePath = `/images/posts/${post._id}/${post.image}`;

  return (
    <li className={classes.post}>
      <Link href={`/posts/${post._id}`}>
        <div className={classes.image}>
          <Image
            src={imagePath}
            alt={post.title}
            fill={true}
          />
        </div>
        <div className={classes.content}>
          <h3>{post.title}</h3>
          <time>{formattedDate}</time>
          <p>{post.excerpt}</p>
        </div>
      </Link>
    </li>
  );
}
