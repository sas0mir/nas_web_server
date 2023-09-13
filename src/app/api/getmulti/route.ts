import { stat } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import mime from "mime";
import { createReadStream, createWriteStream, readFile } from "fs";
import { Http2ServerRequest, Http2ServerResponse } from "http2";
import Express from 'express';
import url from "url";

export async function POST(request: Express.Request, response: Express.Response) {
    
    try {
        const files = request.body || [];
        console.log('FILES->', typeof files, Array.isArray(files), files);
        files.forEach(async (file: any) => {
            const mimeType = mime.getType(file.path + '/' + file.name) || 'image/jpeg';
            const size = (await stat(file.path + '/' + file.name)).size;
            // const fileToSend = await readFile(file.path + '/' + file.name, 'binary');
            response.setHeader('Conent-Length', size);
            response.setHeader('Conent-Type', mimeType);
            // response.setHeader('Conent-Disposition', `attachment; filename=${file.name}`);
            // response.write(fileToSend, 'binary');
            // response.end()
            console.log('DOWNLOAD->', file);
            response.download(file.path + '/' + file.name);
        });
    } catch(err) {
        console.error('GET-FILE-ERROR->', err)
        return NextResponse.json({success: false, error: err})
    }
}