import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// import context from ./context/MyContext.ts and it is called AppContextProvider
import {AppContextProvider} from '@/context/MyContext'

// fontawesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}
