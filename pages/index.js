import InfiniteScroll from "react-infinite-scroll-component";
import Link from 'next/link';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
    revalidate: 10,
  };
}

function TimeLine({ id, title, date, direction, icon}) {  
  let iconDirection = direction === "left" ? "icon-left" : "icon-right";
  return (    
    <div className={`container ${direction}`}>
      {" "}      
      <div className={`icon-wrapper ${iconDirection}`}>
            <i className={`fa fa-${icon}`} aria-hidden="true"></i>
      </div>
      <article className="content" key={id}>
        <small className={utilStyles.whiteText}>
          <Date dateString={date} />
        </small>
        <br />
        <Link href={`/posts/${id}`}>
          <a className={utilStyles.linkDarkText}>{title}</a>
        </Link>                  
      </article>      
    </div>
  );
}

export default function Home({ allPostsData }) {
  let direction = "";
  return (
    <Layout home className="background">     
      <div className="timeline">
        <InfiniteScroll
            dataLength={allPostsData?.length * 10}
            next={() => console.log("fetching more data")}
            hasMore={true}
            loader={<h4></h4>}>            
              {allPostsData.map(({ id, date, title, icon }) => {                  
                direction = direction === "left" ? "right" : "left";                
                return <TimeLine id={id} title={title} date={date} direction={direction} icon={icon} key={id}/>;              
              })}           
        </InfiniteScroll>
      </div>
    </Layout>
  );
}
