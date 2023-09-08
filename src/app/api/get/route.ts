import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function GET(request: NextRequest) {

    const filepath = request.nextUrl.searchParams.get('filepath') || '';

    const path = join(filepath)
    
    const file = await readFile(path);
    //todo createReadStream(path).pipe(res) in res.writeHead(200), {Content-Length: todo length with fs.stat, Content-Type: video/mp4}

    if (!file) {
        //console.error(err);
        return NextResponse.json({success: false, error: '!FILE TODO'})
    } else {
        return NextResponse.json({success: true, file: file})
    }
}