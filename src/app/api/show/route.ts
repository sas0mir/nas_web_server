import { readdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function GET(request: NextRequest) {

    console.log('REQUEST->', request);
    // const data = await request.formData();
    // const file: File | null = data.get('file') as unknown as File

    // if (!file) {
    //     return NextResponse.json({success: false})
    // }

    // const bytes = await file.arrayBuffer()
    // const buffer = Buffer.from(bytes)

    const path = join('/')
    
    const files = await readdir(path, {withFileTypes:true});
    console .log(`FILES ->${files.length}`)
    if (!files) {
        //console.error(err);
        return NextResponse.json({success: false, error: '!FILES TODO'})
    } else {
        return NextResponse.json({success: true, files: files})
    }
}