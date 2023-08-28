'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { Explorer } from './explorer'
import React, {useState} from 'react'

export default function Home() {
  const [authorized, setAuthorized] = useState(false)

  const checkPass = (pass: String) => {
    if (pass && pass === "batman") setAuthorized(true)
  }

  const authInput = <input className={styles.auth_input} type='password' placeholder='password' onChange={e => checkPass(e.target.value)}></input>
  return (
    <main className={styles.main}>
      {authorized ? <Explorer/> : authInput}
    </main>
  )
}
