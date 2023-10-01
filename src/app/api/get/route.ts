import { stat } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import mime from "mime";
import { createReadStream, createWriteStream, statSync } from "fs";
import { Http2ServerRequest, Http2ServerResponse } from "http2";
import Express from 'express';
import url from "url";
import ffmpeg from 'fluent-ffmpeg';

export async function GET(request: NextApiRequest, response: NextApiResponse) {
    const reqQuery = url.parse(request.url as string, true).query;
    console.log('QUERY->', request.headers);
    const filepath = Array.isArray(reqQuery) ? reqQuery[0].filepath : reqQuery.filepath;
    const mimeType = mime.getType(filepath) || 'image/jpeg';
    const range = request.headers.range || '0-21';

    if(!range) {
        console.log('NO RANGE');
        return response.status(400).send('Range not provdied');
    }

    const path = join(filepath)
    try {
        const size = statSync(path).size;//(await stat(path)).size;

        const chunkSize = 1024 * 1024;
        const start = Number(range.replace(/\D/g, ''));
        const end = Math.min(start + chunkSize, size - 1);
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${size}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": mimeType
        }

        if (typeof response.writeHead === 'function') response.writeHead(206, headers);
        //response.headers
        const mediaStream = createReadStream(path, {start, end});

        if(mimeType.split('/')[0] === 'video') {
            // const ffmpegStream = ffmpeg(mediaStream)
            // .noAudio()
            // .videoCodec('libx264')
            // .format('mp4')
            // .outputOptions('-movflags frag_keyframe+empty_moov')
            // .on('end', () => {
            //     console.log('ON-SERVER-STREAM-FINISHED');
            // })
            // .on('error', (err) => {
            //     console.error('SERVER-STREAM-ERROR->', err)
            // })
            // return new NextResponse(ffmpegStream)
            //ffmpegStream.pipe(response)
            mediaStream.pipe(response);
        } else {
            //response.pipe(mediaStream);
            //todo createWritestream for response
            //const writeStream = createWriteStream(response)
            mediaStream.pipe(response);
        }

    } catch(err) {
        console.error('GET-FILE-ERROR->', err)
        return NextResponse.json({success: false, error: err})
    }
}