import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { BasePost, Post } from '@app-types/posts';

const postsPath = path.join(process.cwd(), 'content', 'posts');

export function getAllPosts() {
  const postFiles = fs.readdirSync(postsPath);
  const allPosts = postFiles.map((file) => {
    return getPostData(file);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.isFeatured);
}

export function getPostData(postId: string): Post {
  postId = postId.replace(/\.md$/, '');
  const filePath = path.join(postsPath, `${postId}.md`);
  const postFile = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(postFile);
  
  return {
    ...(data as BasePost),
    _id: postId,
    content: content,
  };
}
