import { readdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function GET(request: NextRequest) {

    const folderPath = request.nextUrl.searchParams.get('folder') || 'root';

    const path = join(folderPath === 'root' ? '/media/sas/DRIVE_D' : folderPath)
    
    const files = await readdir(path, {withFileTypes:true});
    console .log(`READDIR->${path} FILES->${files.length}`)
    if (!files) {
        //console.error(err);
        return NextResponse.json({success: false, error: '!FILES TODO'})
    } else {
        return NextResponse.json({success: true, files: files})
    }
}