import { getEventById, getFeaturedEvents } from '@helpers/api-util';
import EventContent from 'components/event-detail/event-content';
import EventLogistics from 'components/event-detail/event-logistics';
import EventSummary from 'components/event-detail/event-summary';
import Comments from 'components/input/comments';
import Head from 'next/head';

export default function EventDetailsPage({ event }) {
  if (!event) {
    return (
      <div className='center'>
        <p> Loading... </p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>| NextJS Events</title>
        <meta name="description" content="Test description to improve SEO"/>
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      event: event,
    },
    revalidate: 30, 
  };
}

export async function getStaticPaths() {
  const paths = (await getFeaturedEvents()).map(event => {
    return {
      params: {
        eventId: event.id,
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
}

