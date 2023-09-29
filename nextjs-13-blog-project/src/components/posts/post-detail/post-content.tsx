import PostHeader from './post-header';
import classes from './post-content.module.css';
import { Post } from '@app-types/posts';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Image from 'next/image';
import { Component } from 'react';
import { SpecialComponents } from 'react-markdown/lib/ast-to-react';

type MarkdownElement = {
  node: {
    type: 'element',
    tagName: 'p',
    properties: {},
    children: [ [Object] ],
    position: { start: [Object], end: [Object] }
  },
  children: [ '... More content ...' ]
}
export default function PostContent({ post }: { post: Post }) {
  const customRenderer: Record<string, any> = {
    img: (image: HTMLImageElement) => {
      return (
        <Image
          src={`/images/posts/${post._id}/${image.src}`}
          alt={image.alt}
          width={600}
          height={300}
        />
      );
    },
    p: (paragraph: any) => {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const img = node.children[0].properties;

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post._id}/${img.src}`}
              alt={img.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{ paragraph.children} </p>;
    },
  };
  const imagePath = `/images/posts/${post._id}/${post.image}`;

  return (
    <article className={classes.content}>
      <PostHeader
        title={post.title}
        image={imagePath}
      />
      <ReactMarkdown components={customRenderer}>{post.content}</ReactMarkdown>
    </article>
  );
}
