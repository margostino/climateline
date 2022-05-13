import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'ClimateLine';
const siteTitle = 'ClimateLine';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>  
        <link rel="icon" href="favicon.ico" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Walk through all events that have affected the Climate on earth along the history"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="author" content="Martin D'Agostino" />                    
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:creator" content="@margostino" />
        <meta name="twitter:site" content="@climateline" />
        <meta name="twitter:title" content="Remembering the most significant Climate Change events along the history"/>
        <meta name="twitter:description" content="A timeline of the most significant Climate Change events along the history."/>
        <meta name="twitter:image" content="https://raw.githubusercontent.com/margostino/climateline/master/public/images/readme.png"/>
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
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/about">
                <a className={utilStyles.mainTitle}>{name}</a>
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
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
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