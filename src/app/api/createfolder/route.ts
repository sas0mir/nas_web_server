import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: NextRequest) {
    const folderPathQuery = request.nextUrl.searchParams.get('path') || '';
    console.log('CREATEPATH->', folderPathQuery);
    const folderPath = join(folderPathQuery);
    try {
        if(!existsSync(folderPath)) {
            mkdirSync(folderPath)
        }
        console.log(`folder ${folderPath} created`)

        return NextResponse.json({success: true, ok: true, text: `folder ${folderPath} created`})
    } catch(err) {
        console.error('UPLOAD-ERROR->', err);
        return NextResponse.json({success: false, error: err})
    }
}