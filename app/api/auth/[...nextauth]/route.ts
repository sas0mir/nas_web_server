import NextAuth, { NextAuthOptions, RequestInternal } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { Record } from "@prisma/client/runtime/library";
import { env } from "process";
import bcrypt from "bcrypt";
import {PrismaAdapter} from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {label: "Username", placeholder: "username", type: "text"},
                password: {label: "Password", type: "password"},
                email: {label: "Email", type: "email"}
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined, req: Pick<RequestInternal, "query" | "body" | "headers" | "method">) {
                if(!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                });

                if(!user) {
                    return null
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword || '');

                if(!passwordMatch) {
                    return null
                }
                
                await prisma.logs.create({
                    data: {
                        operation: 'login',
                        path: 'back_auth',
                        date: new Date(),
                        userId: user.id
                    }
                });
                return {...user, id: user.id.toString()}
            }
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: env.NEXTAUTH_SECRET,
    debug: env.NODE_ENV === "development",
};
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};