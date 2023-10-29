"use client"

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../ui/global.module.css";

export default function RegisterPage() {

    const router = useRouter();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const registerUser = async (e: FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log('REISTER-UI-RES->', response);
        const userInfo = await response.json();
        console.log('REGISTER-USERINFO->', userInfo);
        router.push('/login');
    }

    return (
        <>
            <form className={styles.auth_form} onSubmit={registerUser}>
            <h2 className={styles.auth_title}>Registration/Registrazione</h2>
                <div className={styles.auth_field}>
                    <label htmlFor="name" className={styles.auth_label}>Name</label>
                    <input id="name" name="name" type="text" required value={data.name} onChange={(e) => setData({...data, name: e.target.value})} className={styles.auth_input}></input>
                </div>
                <div className={styles.auth_field}>
                    <label htmlFor="email" className={styles.auth_label}>Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" required value={data.email} onChange={(e) => setData({...data, email: e.target.value})} className={styles.auth_input}></input>
                </div>
                <div className={styles.auth_field}>
                    <label htmlFor="password" className={styles.auth_label}>Password</label>
                    <input id="password" name="password" type="password" autoComplete="current-password" required value={data.password} onChange={(e) => setData({...data, password: e.target.value})} className={styles.auth_input}></input>
                </div>
                <input type='submit' value='Submit/Invia' className={styles.auth_btn}/>
            </form>
        </>
    )
}