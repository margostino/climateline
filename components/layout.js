import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const siteName = 'Climateline';
const siteTitle = 'Climateline';
const author = 'Martin D\'Agostino'
const currentURL = 'https://climateline.vercel.app'
const previewImage = 'https://raw.githubusercontent.com/margostino/climateline/master/public/images/logo.png'
const siteDescription = 'A timeline of Climate Change events along the history'
const socialTitle = 'Raising Awareness through the time'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>          
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-QGCX7YEQN4`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QGCX7YEQN4', {
            page_path: window.location.pathname,
          });
        `,
          }}
        />
        <link rel="icon" href="favicon.ico" />
        {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" /> */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={siteDescription} />        
        <meta name="author" content={author} /> 
        {/* Open Graph */}
        <meta property="og:url" content={currentURL} key="ogurl" />
        <meta property="og:image" content={previewImage} key="ogimage" />
        <meta property="og:site_name" content={siteName} key="ogsitename" />
        <meta name="og:title" content={siteTitle} key="ogtitle" />
        <meta property="og:description" content="{siteDescription}" key="ogdesc" />                           
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:creator" content="@margostino" />
        <meta name="twitter:site" content="@climateline" />
        <meta name="twitter:title" content={socialTitle}/>
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={previewImage}/>
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Link href="/about">
              <a>
                <Image
                  priority
                  src="/images/header.png"
                  className={utilStyles.borderCircle}
                  height={144}
                  width={144}
                  alt={siteName}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/about">
                <a className={utilStyles.mainTitle}>{siteName}</a>
              </Link>         
            </h2>     
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/header.png"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={siteName}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{siteName}</a>
              </Link>         
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={utilStyles.backToHome}>
          <Link href="/">
            <a>← Back to Timeline</a>
          </Link>
        </div>
      )}
      {/* <footer className={styles.footer}>
      {home ? (
          <>
            <Image
              priority
              src="/images/footer.png"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />            
          </>
        ) : (
          <></>
        )}        
      </footer> */}
    </div>
  );
}