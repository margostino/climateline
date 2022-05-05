import Link from 'next/link';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

function TimeLineBloc({ title, date, direction }) {  
  return (    
    <div className={`container ${direction}`}>
      {" "}
      <article className="content">
        <p className="font-bold py-8 text-sky-500 hover:text-sky-800">{date}</p>        
        <Link href="/about">          
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
        <p>
          {" "}
        </p>        
      </section>
      <div className="timeline">
        {allPostsData.map(({ id, date, title }) => {
          direction = direction === "left" ? "right" : "left";
          return <TimeLineBloc title={title} date={date} direction={direction} key={id} />;
        })}
      </div>
    </Layout>
  );
}