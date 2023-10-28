import busboy from "busboy";
import { createWriteStream } from "fs";
import type {NextApiRequest, NextApiResponse} from "next";
import { headers } from "next/headers";
import url from "url";

export const config = {
    api: {
        bodyParser: false,
    },
};

export function POST(req: NextApiRequest, res: NextApiResponse) {
    const reqQuery = url.parse(req.url as string, true).query;
    const headersList = headers();
    console.log('HEADERS->', req.headers);
    const normalHeaders = {
        ...req.headers,
        'accept': headersList.get('accept') as string,
        'accept-encoding': headersList.get('accept-encoding') as string,
        'accept-language': headersList.get('accept-language') as string,
        'cache-control': headersList.get('cache-control') as string,
        'connection': headersList.get('connection') as string,
        'content-length': headersList.get('content-length') as string,
        'content-type': headersList.get('content-type') as string,
        'host': headersList.get('host') as string,
        'origin': headersList.get('origin') as string,
        'referer': headersList.get('referer') as string,
        'sec-fetch-mode': headersList.get('sec-fetch-mode') as string,
        'user-agent': headersList.get('user-agent') as string,
        'x-invoke-output': headersList.get('x-invoke-output') as string,
        'x-invoke-path': headersList.get('x-invoke-path') as string,
        'x-invoke-query': headersList.get('x-invoke-query') as string,
        'x-middleware-invoke': headersList.get('x-middleware-invoke') as string,
    };
    console.log('NORMAL->', normalHeaders["content-range"], reqQuery.folder);
    const folder = reqQuery.folder;
    const bb = busboy({headers: normalHeaders});
    bb.on('error', (err) => {
        console.log('BB-ERROR->', err);
        res.writeHead(500, {connection: 'close'});
        res.send(err);
        return
    });
    bb.on('file', (_, file, info) => {
        console.log('BB-ON-FILE->', _, info, folder);
        const fileName = info.filename;
        const filePath = folder;

        const stream = createWriteStream(fileName);

        file.pipe(stream);
    });

    bb.on('close', () => {
        console.log('CLOSE-BUS-BOY->');
        res.writeHead(200, {Connection: "close"});
        res.end("Upload complete");
        return
    });

    if (req.body && typeof req.body.pipe === 'function') req.body.pipe(bb);
}