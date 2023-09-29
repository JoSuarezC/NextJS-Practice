import { useRouter } from 'next/router';
import { getAllEvents } from '@helpers/api-util';
import Head from 'next/head';
import EventsSearch from 'components/events/events-search';
import EventList from 'components/events/event-list';

export default function EventsListPage({ events }) {
  const router = useRouter();

  function searchHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <>
      <Head>
        <title>Search Events | NextJS Events</title>
        <meta name="description" content="Test description to improve SEO"/>
      </Head>
      <EventsSearch onSearch={searchHandler}/>
      <EventList items={events}/>
    </>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}