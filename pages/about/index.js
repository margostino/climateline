import path from 'path';
import Layout from '../../components/layout';
import { getFileContent } from '../../lib/articles';

const directory = path.join(process.cwd(), 'pages', 'about');
const fullPath = path.join(directory, `about.md`);

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
}
