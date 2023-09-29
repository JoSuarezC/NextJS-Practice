import Link from 'next/link';

function HomePage() {
  return (
    <>
      <h1>
        The Home Page
      </h1>
      <nav>
        <ul>
          <li>
            <Link href='/porfolio'>
              Porfolio
            </Link>
          </li>
          <li>
            <Link href='/clients'>
              Clients
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default HomePage;
