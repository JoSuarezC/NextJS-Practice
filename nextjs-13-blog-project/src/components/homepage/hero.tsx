import Image from 'next/image';
import classes from './hero.module.css';

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/profile.jpeg'
          alt='Josue profile image'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I am Josue</h1>
      <p>
        I am a Senior Web Developer - experience on frameworks as Angular, React
        and Next JS. Also with knownledge on NodeJS
      </p>
    </section>
  );
}
