import styles from './ui/global.module.css';
import type { Metadata } from 'next';
import Provider from './lib/provider';

export const metadata: Metadata = {
  title: 'garbage',
  description: 'Home file server',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <Provider>
        <body className={styles.body_container}>
          {children}
        </body>
      </Provider>
    </html>
  )
}