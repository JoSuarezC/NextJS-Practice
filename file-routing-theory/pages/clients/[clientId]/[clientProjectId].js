import { useRouter } from 'next/router';

function SelectedClientProjectPage() {
  const router = useRouter();

  return (
    <>
      <h1>Selected Project { router.query.clientProjectId }</h1>
    </>
  );
}

export default SelectedClientProjectPage;
