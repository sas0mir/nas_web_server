"use client"

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
//import type { AppProps } from "next/app";

export default function Provider({children, session}: {
    children: React.ReactNode,
    session?: Session
  }) {
    console.log('PROVIDER-SESSION->', session);
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}