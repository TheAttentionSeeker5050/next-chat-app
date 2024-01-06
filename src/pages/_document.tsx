import { useAppContext } from '@/context/MyContext';
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  
  
  return (
    <Html lang="en" className='m-0 p-0 dark:bg-back-secondary-dark bg-back-light'>
      <Head />
      <body className='m-0 p-0 dark:bg-back-secondary-dark bg-back-light'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
