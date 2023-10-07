import './globals.css'
import type { Metadata } from 'next';
import SessionProvider from './components/session_provider';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
  title: 'garbage',
  description: 'Home file server',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="body_container">
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}
