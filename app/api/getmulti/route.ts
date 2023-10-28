import { stat } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import mime from "mime";
import { createReadStream, createWriteStream, readFileSync } from "fs";
import { Http2ServerRequest, Http2ServerResponse } from "http2";
import Express from 'express';
import url from "url";

export async function POST(request: NextRequest, response: NextResponse) {
    
    try {
        const reqjson = await request.json();
        const files = reqjson.files;
        console.log('FILES->', files);
        files.forEach(async (file: any) => {
            const mimeType = mime.getType(file.path + '/' + file.name) || 'image/jpeg';
            const size = (await stat(file.path + '/' + file.name)).size;
            console.log('MS->', mimeType, size);

            // const resHeaders = new Headers();
            // resHeaders.set('Content-Length', `${size}`);
            // resHeaders.set('Content-Type', mimeType);
            const fileToSend = readFileSync(file.path + '/' + file.name, {encoding: 'base64'});
            //const fileReadStream = createReadStream(file.path + '/' + file.name, {encoding: 'base64'});
            //response.setHeader('Conent-Length', size);
            //response.setHeader('Conent-Type', mimeType);
            // response.setHeader('Conent-Disposition', `attachment; filename=${file.name}`);
            // response.write(fileToSend, 'binary');
            // response.end()
            //response.download(file.path + '/' + file.name);
            console.log('FILE->',typeof fileToSend);
            const resp = new NextResponse(fileToSend);
            console.log('HEAD->', resp.headers);
            resp.headers.set('Content-Length', `${size}`);
            resp.headers.set('Content-Type', mimeType);
            return resp
        });
    } catch(err) {
        console.error('GET-FILE-ERROR->', err)
        return NextResponse.json({success: false, error: err})
    }
}