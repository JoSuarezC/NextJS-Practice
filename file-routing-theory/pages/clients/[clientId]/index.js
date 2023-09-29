import { useRouter } from 'next/router';

function ClientProjectsPage() {
  const router = useRouter();

  function loadProjectHandler() {
    router.push({
      pathname: '/clients/[clientId]/[clientProjectId]',
      query: {
        clientId: 'josue',
        clientProjectId: 'A',
      },
    });
  }

  return (
    <>
      <h1>
        Client Project Page
      </h1>
      <button onClick={loadProjectHandler}>
        Project A
      </button>
    </>
  );
}

export default ClientProjectsPage;
