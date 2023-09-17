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
    const conTyp = headersList.get('content-type');
    const normalHeaders = {...req.headers, 'content-type': headersList.get('content-type') as string};
    console.log('NORMAL->', normalHeaders, 'LIST->', headersList.keys().toString());
    const folder = reqQuery.folder;
    const bb = busboy({headers: normalHeaders});
    bb.on('file', (_, file, info) => {
        console.log('BB->', _, info, folder);
        const fileName = info.filename;
        const filePath = folder;

        const stream = createWriteStream(fileName);

        file.pipe(stream);
    });

    bb.on('close', () => {
        res.writeHead(200, {Connection: "close"});
        res.end("Upload complete");
    });

    req.pipe(bb);
    return
}