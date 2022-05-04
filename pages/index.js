import Link from 'next/link';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

function TimeLineBloc({ title, date, content, direction }) {  
  return (
    <div className={`container ${direction}`}>
      <article className="content">
        <p>{date}</p>
        <p>{title}</p>        
        <p>{content}</p>        
      </article>
    </div>
  );
}

export default function Home({ allPostsData }) {
  let direction = "";
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>        
     </Head>
     <section className={utilStyles.headingMd}>
        <p>
          <Link href="/about/me">
            <a>How dare we?</a>
          </Link>
        </p>
        <p>
          Climate Change Timeline registering Ups and Downs along the history.
        </p>
      </section>     
      <div className="timeline">
        {allPostsData.map(({ id, date, title, content }) => {
          direction = direction === "left" ? "right" : "left";
          return <TimeLineBloc title={title} date={date} content={content} direction={direction} key={id} />;
        })}
      </div>
    </Layout>
  );
}