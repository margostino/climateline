import Layout from '../../components/layout'
import { getArticlesIds, getArticleData } from '../../lib/articles'
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';

export async function getStaticPaths() {
  const paths = getArticlesIds()
  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const articleData = await getArticleData(params.id)  
  return {
    props: {
      articleData
    }
  }
}

export default function Article({ articleData }) {
  return (
    <Layout article>
      <Head>
        <title>{articleData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{articleData.title}</h1>                    
        <div className={utilStyles.lightText}>
          <Date dateString={articleData.date} />
        </div>
        <p className={utilStyles.headingMd}>
          Source:{' '}
          <Link href={articleData.source_url}>
            <a target="_blank">{articleData.source_name}</a>
          </Link>            
        </p>
        <br />
        <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />        
      </article>
    </Layout>
  );
}