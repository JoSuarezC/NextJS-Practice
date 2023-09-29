

import { getFeaturedEvents } from '@helpers/api-util';
import EventList from 'components/events/event-list';
import NewsletterRegistration from 'components/input/newsletter-registration';
import Head from 'next/head';

export default function HomePage({ featuredEvents }) {

  return (
    <main>
      {/* <Head>
        <title>Homepage | NextJS Events</title>
        <meta name="description" content="Test description to improve SEO"/>
      </Head> */}
      <NewsletterRegistration />
      <EventList items={featuredEvents}/>
    </main>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}
