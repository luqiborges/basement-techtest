import type { AppProps } from 'next/app'
import { RoundProvider } from '../providers/round';
import '../styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RoundProvider>
      <Component {...pageProps} />
    </RoundProvider>
  )
}
