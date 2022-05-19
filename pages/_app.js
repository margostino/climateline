import '../styles/global.css';
import '../styles/timeline.css';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {library} from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from 'next-themes'

const iconList = Object.keys(Icons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => Icons[icon]);

library.add(...iconList);

export default function App({ Component, pageProps }) {
    return (
      <ThemeProvider forcedTheme="dark">
        <Component {...pageProps} />
      </ThemeProvider>
    )
}