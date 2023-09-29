import { useRouter } from 'next/router';

function BlogPostsPage() {
  const router = useRouter();

  console.log('router.query', router.query)
  return (
    <div>
      <h2>
        Blog Posts Page {  }
      </h2>
    </div>
  );
}

export default BlogPostsPage;