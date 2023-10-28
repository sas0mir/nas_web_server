import styles from './ui/global.module.css';
//import AuthProvider from './components/session_provider';

export default async function ExplorerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={styles.body_container}>
        {/* <AuthProvider>{children}</AuthProvider> */}
        <h2>explorer layout</h2>
        <p>test for layout for other components like breadcrumbs, logs, etc</p>
        {children}
      </body>
    </html>
  )
}