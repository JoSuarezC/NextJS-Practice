import Logo from './logo';
import Link from 'next/link';
import classes from './navigation.module.css';

export default function Navigation() {
  return (
    <header className={classes.header}>
      <Link href='/'>
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/posts'>Posts</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
