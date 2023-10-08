import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "process";
//import NextAuth from "next-auth/next";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Home NAS",
            credentials: {
                login: {label: "login", placeholder: "username"},
                password: {label: "password", placeholder: "password"}
            },
            async authorize(credentials: any) {
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
};
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};