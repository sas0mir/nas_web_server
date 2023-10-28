import { inter, vt323 } from "./ui/fonts";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function Page({Component, pageProps: {session, ...pageProps}}:AppProps) {
    return (
        <SessionProvider session={session} refetchInterval={5*60}>
            <h1 className={`${inter.className}`}>APP/page.tsx</h1>
            <p className={`${vt323.className}`}>font test text</p>
            <Component {...pageProps} />
        </SessionProvider>
    )
}