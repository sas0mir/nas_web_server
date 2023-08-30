"use client"
import styles from '../page.module.css'
import Logs from "../components/logs";

function Explorer(props: any) {
  return (
    <main className={styles.explorer_container}>
        <h2>EXPLORER</h2>
        <footer>
            <Logs />
        </footer>
    </main>
  )
}

export default Explorer