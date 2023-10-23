import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "process";
import { useRouter } from "next/navigation";
//import NextAuth from "next-auth/next";

//const router = useRouter();

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                login: {label: "login", placeholder: "username", type: "text"},
                password: {label: "password", placeholder: "password", type: "password"}
            },
            authorize(credentials: any) {
                if(!credentials || !credentials.password) {
                    return null;
                }
                if(credentials.password === env.AUTH_PASSWORD) {
                    return credentials
                }
                return null
            }
        })
    ],
    secret: env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/credential-signin"
    }
};
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};