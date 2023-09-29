import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { Provider } from'next-auth/client';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}> 
    {/* recommended optimization for sessions to avoid http calls and redundant func */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
