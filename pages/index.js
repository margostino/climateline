import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>        
      </Head>
      <section className={utilStyles.headingMd}>
        <p>How dare we?</p>
        <p>
          Climate Change Timeline registering Ups and Downs along the history.
        </p>
      </section>
    </Layout>
  );
}