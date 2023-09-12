import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: NextRequest) {
    const folder = request.nextUrl.searchParams.get('folder') || '/media/sas/DRIVE_D';
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
        return NextResponse.json({success: false})
    }
    try {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const path = join(folder, file.name)
        await writeFile(path, buffer)
        console.log(`file uploaded to ${path}`)

        return NextResponse.json({success: true, ok: true, text: `file uploaded to ${path}`})
    } catch(err) {
        console.error('UPLOAD-ERROR->', err);
        return NextResponse.json({success: false, error: err})
    }
}