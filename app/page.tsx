"use client"

import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import styles from "./ui/global.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Page({Component, pageProps}:AppProps) {

    const {data: session, status} = useSession();
    console.log('APP-PAGE->', pageProps, 'SESSION>', session);
    return (
        <main className={styles.main}>
            {session?.user ? 
            <Link href="/explorer" replace className={styles.auth_start_btn}>Back to explorer {session?.user.name}</Link> : 
            <div>
                <Link href="/register" replace className={styles.auth_start_btn}>Register</Link>
                <Link href="/login" replace className={styles.auth_start_btn}>Login</Link>
            </div>
            }
        </main>
    )
}