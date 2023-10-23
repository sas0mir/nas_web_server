import { getCsrfToken } from "next-auth/react";
import styles from "../../page.module.css"

export default function SignIn({csrfToken}: any) {
    return (
        <form method="post" action="/api/auth/callback/credentials">
            <input className={styles.auth_login_input} type='text' placeholder='username' name="login"></input>
            <input className={styles.auth_pass_input} type='password' placeholder='password' name="password"></input>
            <button type="submit">ENTER</button>
        </form>
    )
}

export async function getServerSideProps(context: any) {
    console.log('GETSERVERSIDEPROPS->', context);
    const csrfToken = '1234'; //await getCsrfToken(context)
    return {
        props: {csrfToken}
    }
}