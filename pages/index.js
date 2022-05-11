import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { Ripple } from 'react-awesome-spinners'

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
  let pageSize = 5
  
  const [entries, setEntries] = useState([])
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  // InfiniteScroll only for visualization since all files are loaded at once.
  const fetchData = async () => {
    try {      
      const newEntries = allPostsData.slice(0, offset + pageSize);      
      setEntries(newEntries)
      setOffset((prevOffset) => prevOffset + pageSize)      
      entries.length === allPostsData.length && setHasMore(false)             
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Layout home className="background">     
      <div className="timeline">
        <InfiniteScroll
            dataLength={entries?.length ?? 0}            
            next={fetchData}
            hasMore={hasMore}
            loader={<div className="spinner"><Ripple/></div>} 
            endMessage={<p></p>}          
        >
            {entries.map(({ id, title, date, icon }) => {                  
              direction = direction === "left" ? "right" : "left";                  
              return <TimeLine id={id} title={title} date={date} direction={direction} icon={icon} key={id}/>;                
            })}
        </InfiniteScroll>
      </div>
    </Layout>
  );
}