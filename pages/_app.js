import '../styles/global.css';
import '../styles/timeline.css';
import ReactGA from "react-ga";
import '@fortawesome/fontawesome-svg-core/styles.css'
import {library} from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from 'next-themes'

const iconList = Object.keys(Icons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => Icons[icon]);

library.add(...iconList);

ReactGA.initialize("G-QGCX7YEQN4");
ReactGA.pageview(window.location.pathname + window.location.search);

export default function App({ Component, pageProps }) {
    return (
      <ThemeProvider forcedTheme="dark">
        <Component {...pageProps} />
      </ThemeProvider>
    )
}