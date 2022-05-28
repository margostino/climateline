import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'articles');

export async function getFileContent(fullPath) {    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
  
    // Use gray-matter to parse the article metadata section
    const matterResult = matter(fileContents);
        
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html, {sanitize: false})
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return {
        contentHtml
    };    
}

export async function getArticles() {
  const fileNames = fs.readdirSync(articlesDirectory);
  const articlesData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the article metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();
    
    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
  });
  return articlesData;
}

export function getArticlesIds() {
    const fileNames = fs.readdirSync(articlesDirectory)
    return fileNames.map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      }
    })
  }
  
export async function getArticleData(id) {
  const fullPath = path.join(articlesDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the article metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()        
      .use(html, {sanitize: false})
      .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
      id,
      contentHtml,
      ...matterResult.data,
  };
}

export function sortPosts(orderProperty, articles) {  
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