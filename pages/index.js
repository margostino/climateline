import Link from 'next/link';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

function TimeLineBloc({ id, title, date, direction }) {  
  return (    
    <div className={`container ${direction}`}>
      {" "}
      <article className="content" key={id}>
        <small className={utilStyles.lightText}>
          <Date dateString={date} />
        </small>
        <br />
        <Link href={`/posts/${id}`}>
          <a className="font-bold py-8 text-sky-500 hover:text-sky-800">{title}</a>
        </Link>                  
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
      </section>
      <div className="timeline">
        {allPostsData.map(({ id, date, title }) => {                  
          return [...Array(100)].map((_, i) => {
            direction = direction === "left" ? "right" : "left";
            return <TimeLineBloc id={id} title={title} date={date} direction={direction} key={id}/>;
          });
          
          //return <TimeLineBloc id={id} title={title} date={date} direction={direction} key={id}/>;
        })}
      </div>
    </Layout>
  );
}