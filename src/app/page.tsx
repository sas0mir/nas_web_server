"use client"

import { useRouter } from 'next/navigation'
import styles from './page.module.css';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Home() {

  const router = useRouter();
  const [login, setLogin] = useState<string>('');

  const checkPass = (value: string) => {
    //todo put session in logs bd
    if (login && value === "batman") {
      console.log('AUTH->', login, value);
      signIn('credentials', undefined, {login: login, pass: value})
      router.push('/explorer');
    }
  }

  return (
    <main className={styles.main}>
      <input className={styles.auth_login_input} type='login' placeholder='username' onChange={e => setLogin(e.target.value)}></input>
      <input className={styles.auth_pass_input} type='password' placeholder='password' onChange={e => checkPass(e.target.value)}></input>
    </main>
  )
}