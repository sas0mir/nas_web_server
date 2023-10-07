"use server"

import { join } from "path";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import NextAuth from "next-auth/next";

export async function auth(pass: any) {

}

export async function submitUpload(folder: string, data: FormData) {
    "use server"
    const file: File | null = data.get('file') as unknown as File;
    if (!file) {
        throw new Error('PLEASE ADD FILE FOR UPLOAD');
    }
    if (file.size < 10000000) {
        try {
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)

            const path = join(folder, file.name)
            await writeFile(path, buffer)
            console.log(`file uploaded to ${path}`)

            return {success: true}
        } catch(err) {
            console.error('UPLOAD-ERROR->', err);
            return {success: false}
        }
        revalidatePath(window.location.pathname);
    } else {

    }
}