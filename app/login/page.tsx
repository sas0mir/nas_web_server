"use client"

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "../ui/global.module.css"

export default function LoginPage() {

    const router = useRouter();
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const loginUser = async (e: FormEvent) => {
        e.preventDefault();
        signIn('credentials', {
            ...data,
            redirect: false
        });
        router.push('/explorer');
    }

    return (
        <>
            <form className={styles.auth_form} onSubmit={loginUser}>
            <h2 className={styles.auth_title}>Sign in/Accedi con</h2>
                <div className={styles.auth_field}>
                    <label htmlFor="email" className={styles.auth_label}>Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" required value={data.email} onChange={(e) => setData({...data, email: e.target.value})} className={styles.auth_input}></input>
                </div>
                <div className={styles.auth_field}>
                    <label htmlFor="password" className={styles.auth_label}>Password</label>
                    <input id="password" name="password" type="password" autoComplete="current-password" required value={data.password} onChange={(e) => setData({...data, password: e.target.value})} className={styles.auth_input}></input>
                </div>
                <input type='submit' value='Enter/Entrare' className={styles.auth_btn}/>
            </form>
        </>
    )
}