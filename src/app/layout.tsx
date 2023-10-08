import './globals.css'
import type { Metadata } from 'next';
import AuthProvider from './components/session_provider';

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
      <body className="body_container">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
