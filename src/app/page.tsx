"use client"

import { useRouter } from 'next/navigation'
import styles from './page.module.css';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';
import { connectToDB } from './utils/helpers';
import { prisma } from '@/db';

export default function Home() {

  const router = useRouter();
  const [login, setLogin] = useState<string>('');
  const {data, status} = useSession();

  useEffect(() => {
    console.log('MOUNT->', data, status);
    // if (!data) router.push('/api/auth/singing')
    // else router.push('/explorer')
  }, [])

  const checkPass = async (value: string) => {
    //todo put session in logs bd
    if (login && value === "batman") {
      console.log('AUTH->', login, value);
      await connectToDB();
      const newLog = await prisma.logs.create({data: {id: 99, operation: `${login} logged in`, path: 'root', date: new Date()}});
      await prisma.$disconnect();
      //signIn('credentials', undefined, {login: login, pass: value})
      router.push('/explorer');
    }
  }
  console.log('SESSION->', data);
  return (
    <main className={styles.main}>
      <p>{JSON.stringify(data)}</p>
      <input className={styles.auth_login_input} type='login' placeholder='username' onChange={e => setLogin(e.target.value)}></input>
      <input className={styles.auth_pass_input} type='password' placeholder='password' onChange={e => checkPass(e.target.value)}></input>
    </main>
  )
}