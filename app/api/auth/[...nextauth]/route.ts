import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
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
        }),
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID || '',
            clientSecret: env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    secret: env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: ({token, user}) => {
            if (user) {
                token.id = user.name;//user.id
            }
            return token
        },
        session: ({session, token}) => {
            if (token) {
                console.log('AUTH-SESSION-CALLBACK-TOKEN->', token);
                //session.id = token.id;
            }
            return session
        },
        async redirect({url, baseUrl}) {
            console.log('REDIRECT CRED AUTH->', url, baseUrl);
            return url
        },
        // async signIn({account, profile}) {
        //     if(account?.provider === 'google') {
        //         console.log('GOOGLE-AUTH-CALLBACK->', profile);
        //         return profile?.email //profile.email_verified && profile?.email?.endsWith('@gmail.com')
        //     }
        //     return true
        // }
    },
    jwt: {
        secret: env.NEXTAUTH_SECRET,
        //encryption: true
    },
    pages: {
        signIn: "api/auth/signin"
    }
};
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};