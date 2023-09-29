function UserIDPage({ userId }) {
  return (
    <>
      <h1>
        {userId}
      </h1>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  const id = params.uid;
  
  return {
    props: {
      userId: id,
    },
  };
}

export default UserIDPage;
