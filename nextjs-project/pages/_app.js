import Layout from 'components/layout/layout';
import '../styles/globals.css';
import Head from 'next/head';
import { NotificationContextProvider } from 'store/notification-context';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>NextJS Events</title>
          <meta charSet="UTF-8"/>
          <meta name="description" content="Test description to improve SEO"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta name="keywords" content="NextJS, React, NodeJS, Events, Training"/>
          <meta name="author" content="Josue Suarez"/>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
