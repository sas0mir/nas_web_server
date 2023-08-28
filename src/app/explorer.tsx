import React, {useState} from "react";
import styles from './page.module.css'

export const Explorer = (props: any) => {
    const [authorized, setAuthorized] = useState(false)
  return (
    <main className={styles.explorer_container}>
        <h2>EXPLORER</h2>
    </main>
  )
}