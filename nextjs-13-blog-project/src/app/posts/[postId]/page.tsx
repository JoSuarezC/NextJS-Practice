import PostContent from '@components/posts/post-detail/post-content';
import { getPostData } from '@helper/post-util';

export const metadata = {
  title: 'Single Post',
  description: 'Showing data of the post',
};

export default function SinglePostPage({
  params: { postId },
}: {
  params: { postId: string };
}) {
  metadata.title = `${postId} Post`;
  const post = getPostData(postId);
  return <PostContent post={post} />;
};

