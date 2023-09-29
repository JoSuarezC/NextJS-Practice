import { useRouter } from 'next/router';

function PorfolioProjectPage() {
  const router = useRouter();
  const id = router.query.id;
  
  return (
    <>
      <h1>Single Project {id} </h1>
    </>
  );
}

export default PorfolioProjectPage;
