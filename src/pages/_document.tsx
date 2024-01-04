import { useAppContext } from '@/context/MyContext';
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  
  return (
    <Html lang="en" >
      <Head />
      <body className={`min-h-screen bg-back-light`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
