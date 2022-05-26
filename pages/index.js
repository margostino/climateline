import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getPosts } from '../lib/posts';
import Date from '../components/date';
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { Ripple } from 'react-awesome-spinners'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ca } from 'date-fns/locale';

const categoryMapping = {
  "agreements": ["sign-out", "handshake"],
  "assessment": ["file-text"],
  "awareness": ["seedling"],
  "warming": ["thermometer-three-quarters"]
};

export async function getStaticProps() {  
  const allPostsData = await getPosts();
  return {
    props: {
      allPostsData,      
    },
    revalidate: 10,
  };
}

// Sort posts by date
function sortPosts(orderProperty, articles) {  
  return articles.sort(({ date: a }, { date: b }) => {    
    if (a < b) {
      return orderProperty === "descending" ? 1 : -1;
    } else if (a > b) {
      return orderProperty === "descending" ? -1 : 1;
    } else {
      return 0;
    }
  });
}

function TimeLine({ id, title, date, direction, icon}) {  
  let iconDirection = direction === "left" ? "icon-left" : "icon-right";    
  return (        
    <div className={`container ${direction}`}>      
      {" "}      
      <div className={`icon-wrapper ${iconDirection}`}>            
            <FontAwesomeIcon icon={icon} size="1x" fixedWidth aria-hidden="true" color='black'/>            
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
  let pageSize = 10

  const [order, setOrder] = useState("descending")
  const [category, setCategory] = useState("initial")
  const [entries, setEntries] = useState([])
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  
  // InfiniteScroll only for visualization since all files are loaded async at once.
  const fetchData = async () => {
    try {    
      const newEntries = allPostsData.slice(0, offset + pageSize);      
      setEntries(newEntries)
      filterByCategory();
      sorting(order);     
      setOffset((prevOffset) => prevOffset + pageSize)      
      entries.length === allPostsData.length && setHasMore(false)             
    } catch (error) {
      console.log(error)
    }
  }

  function filterByCategory() {        
    const category = document.getElementById("categories").value    
    setCategory(category);
    if (["initial", "all"].includes(category)) {      
      setEntries(allPostsData);
    } else {
      const filtered = allPostsData.filter(function(item) {
        const icons = categoryMapping[category]      
        return icons.includes(item.icon);      
      });
      setEntries(filtered);
    }
  }

  function sorting(selectedOrder) {        
    const preOrder = selectedOrder === "descending" ? "ascending" : "descending";
    const root = window.document.documentElement;    
    root.classList.remove(preOrder);
    root.classList.add(selectedOrder);
    // if (typeof window !== "undefined") {
    //   localStorage.setItem("order", order);
    // }
    const sorted = sortPosts(selectedOrder, (entries.length > 0) ? entries : allPostsData);    
    setOrder(selectedOrder);
    setEntries(sorted);            
  }

  useEffect(() => {    
    fetchData()
  }, [])
  
  return (
    <Layout home>    
        <select id="categories" 
                onChange={filterByCategory} 
                className="place-items-center w-40 p-1.5 ml-20 sm:ml-56 bg-stone-800 text-white inline-flex border border-gray-300 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="initial" defaultValue>Choose a category</option>
          <option value="all">All</option>
          <option value="agreements">Agreements</option>
          <option value="assessment">Assessment</option>
          <option value="awareness">Awareness</option>          
          <option value="warming">Warming</option>
        </select>                
        <div className='sorting'>
          {order === "descending" ? (
                      <svg 
                        className="svg-icon hover:fill-current hover:text-cyan-500" 
                        onClick={() => sorting("ascending")}
                        style={{width:"1em", height:"1em", vertical:"middle", fill:"currentColor", overflow:"hidden", display:"inline-block", marginLeft:"10px"}}              
                        viewBox="0 0 1024 1024" 
                        color="white"
                        version="1.1" 
                        xmlns="http://www.w3.org/2000/svg">
                          <path d="M279.15323 958.059228l217.110799-363.160177-141.539436 0L354.724593 63.957829l-151.123938 0 0 530.943021L62.057421 594.900849 279.15323 958.059228 279.15323 958.059228zM570.078783 64.464885l386.443791 0 0 108.976114L570.078583 173.440999 570.078783 64.464885 570.078783 64.464885zM570.078783 369.594007 878.364965 369.594007l0-108.974515L570.078783 260.619492 570.078783 369.594007zM570.078783 565.747016l230.128573 0 0-108.976114L570.078783 456.770901 570.078783 565.747016 570.078783 565.747016zM570.078783 761.904621l151.972163 0L722.050945 652.930305l-151.972163 0L570.078783 761.904621zM570.078783 958.059228l73.813355 0 0-108.974315-73.813355 0L570.078783 958.059228z"  />                          
                      </svg>                
                    ) : (
                      <svg 
                      className="svg-icon hover:fill-current hover:text-cyan-500" 
                        onClick={() => sorting("descending")}
                        style={{width:"1em", height:"1em", vertical:"middle", fill:"currentColor", overflow:"hidden", display:"inline-block", marginLeft:"10px"}} 
                        color="white"
                        viewBox="0 0 1024 1024" 
                        version="1.1" 
                        xmlns="http://www.w3.org/2000/svg">
                          <path d="M569.508769 653.352619l151.594419 0 0 108.819221-151.594419 0L569.508769 653.352619zM569.508769 65.693452l385.479045 0 0 108.828814L569.508569 174.522266 569.508769 65.693452 569.508769 65.693452zM569.508769 261.583239l307.513506 0 0 108.819021L569.508769 370.402259 569.508769 261.583239 569.508769 261.583239zM569.508769 457.463032l229.552363 0 0 108.821019-229.552363 0C569.508769 566.284051 569.508769 457.463032 569.508769 457.463032zM569.508769 849.232612l73.62868 0 0 108.826815-73.62868 0L569.508769 849.232612zM354.693414 427.846912l0 530.212516L203.94622 958.059428 203.94622 427.846912 62.754748 427.846912 279.308125 65.187795 495.87849 427.846912 354.693414 427.846912z"  />
                      </svg>
                    )}          
      </div>
      <br/><br/>                   
      <div className="timeline">
        <InfiniteScroll
            dataLength={entries?.length ?? 0}            
            next={fetchData}
            hasMore={hasMore}
            loader={<div className="spinner"><Ripple/></div>} 
            endMessage={<p></p>}>
            {entries.map(({ id, title, date, icon }) => {                  
              direction = direction === "left" ? "right" : "left";   
              if (date) {
                return <TimeLine id={id} title={title} date={date} direction={direction} icon={icon} key={id}/>;   
              } else {
                return;
              }
            })}
        </InfiniteScroll>
      </div>
    </Layout>      
  );
}