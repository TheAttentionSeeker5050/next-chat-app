import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// import context from ./context/MyContext.ts and it is called AppContextProvider
import {AppContextProvider} from '@/context/MyContext'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}
