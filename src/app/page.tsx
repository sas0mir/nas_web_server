"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import { Explorer } from './explorer'

export default function Home() {

  const router = useRouter()

  const checkPass = (pass: String) => {
    if (pass && pass === "batman") router.push('/explorer')
  }

  const authInput = <input className={styles.auth_input} type='password' placeholder='password' onChange={e => checkPass(e.target.value)}></input>
  return (
    <main className={styles.main}>
      {authInput}
    </main>
  )
}