import path from 'path';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';
import { getFileContent } from '../../lib/posts';

const aboutDirectory = path.join(process.cwd(), 'pages', 'about');
const fullPath = path.join(aboutDirectory, `about.md`);

export async function getStaticProps() {
  const content = await getFileContent(fullPath);  
  return {
    props: {
      content,
    },
  };
}

export default function About({content}) {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: content.contentHtml }} />
    </Layout>
  );



    // return (
    //   <>
    //     <Layout>
    //         <Head>
    //             <title>About ClimateLine</title>
    //         </Head>                        
    //         <h2>
    //         <Link href="/">
    //             <a>Back to home</a>
    //         </Link>
    //         </h2>
    //     </Layout>
    //   </>    
    // );
}
