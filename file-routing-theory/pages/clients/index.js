import Link from 'next/link';

function ClientPage() {
  const clientsArray = [
    {
      id: '1',
      name: 'Josue',
    },
    {
      id: '2',
      name: 'Mari',
    },
  ];

  return (
    <>
      <h1>
        Client Page
      </h1>
      <nav>
        <ul>
          {
            clientsArray.map(client => {
              return (
                <li key={client.id}>
                  <Link href={{
                    pathname: '/clients/[clientId]',
                    query: {
                      clientId: client.id,
                    },
                  }}>
                    { client.name }
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </nav>
    </>
  );
}

export default ClientPage;
