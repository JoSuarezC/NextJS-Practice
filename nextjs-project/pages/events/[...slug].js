

import { getFilteredEvents } from '@helpers/api-util';
import EventList from 'components/events/event-list';
import ResultsTitle from 'components/events/results-title';
import Button from 'components/ui/button';
import ErrorAlert from 'components/ui/error-alert';
import Head from 'next/head';

export default function FilteredEventsPage({ filteredEvents, year, month, hasError }) {
  if (hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid Filter. Please adjust your values</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p> No Events found </p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <>
      <Head>
        <title>Filter Events | NextJS Events</title>
        <meta name="description" content={`All events for ${month}/${year}`}/>
      </Head>
      <ResultsTitle date={date}/>
      <EventList items={filteredEvents} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

  if (!filterData) {
    return {
      notFound: true,
    }
  }

  const year = +filterData[0];
  const month = +filterData[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return {
      props: {
        hasError: true,
      },
      //notFound: true,
      // redirect: {
      //   destination: '/error',
      // },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: year,
    month: month,
  });

  return {
    props: {
      filteredEvents: filteredEvents,
      year: year,
      month: month,
    },
  };
}