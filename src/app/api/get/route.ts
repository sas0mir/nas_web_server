import { stat } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import mime from "mime";
import { createReadStream, createWriteStream } from "fs";
import { Http2ServerRequest, Http2ServerResponse } from "http2";
import Express from 'express';
import url from "url";

export async function GET(request: Express.Request, response: Express.Response) {
    const reqQuery = url.parse(request.url, true).query;
    const filepath = Array.isArray(reqQuery) ? reqQuery[0].filepath : reqQuery.filepath;
    const mimeType = mime.getType(filepath) || 'image/jpeg';
    const range = request.headers.range || '1';
    console.log('RANGE->', range);

    const path = join(filepath)
    console.log('FILEPATH->', path);
    try {
        const size = (await stat(path)).size;
        console.log('STATS->', size);

        const chunkSize = 10 ** 6; //1mb
        const start = Number(range.replace(/\D/g, ''));
        const end = Math.min(start + chunkSize, size - 1);
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${size}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": mimeType
        }
        console.log('RESPONSE->',typeof response.writeHead, response);
        if(typeof response.writeHead === 'function') response.writeHead(206, headers);
        const mediaStream = createReadStream(path, {start, end});
        //response.pipe(mediaStream);
        //todo createWritestream for response
        //const writeStream = createWriteStream(response)
        mediaStream.pipe(response);
    } catch(err) {
        console.error('GET-FILE-ERROR->', err)
        return NextResponse.json({success: false, error: err})
    }
}