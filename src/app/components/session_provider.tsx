"use client"
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const AuthPovider = ({children}: {children: ReactNode}) => {
    console.log("SPROVIDER->", children);
    return <SessionProvider>{children}</SessionProvider>
}

export default AuthPovider;