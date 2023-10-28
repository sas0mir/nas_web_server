"use client"
import { useState } from 'react';
import styles from '../ui/global.module.css';
import {TfiAngleDown, TfiAngleUp} from 'react-icons/tfi';

export default function List(props: any) {

    const {files, action} = props;
    const [show, setShow] = useState(false);

    const download = async() => {
        try {
            const data = JSON.stringify({files: files});
            fetch(`/api/getmulti`, {
                method: 'POST',
                //mode: 'no-cors',
                //referrerPolicy: 'no-referrer',
                body: data,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                console.log('RRR-1->', res);
                const reader = res.body?.getReader();
                return new ReadableStream({
                    start(controller) {
                        return pump();
                        function pump(): any {
                            return reader?.read().then(({done, value}) => {
                                if(done) {
                                    controller.close();
                                    return
                                }
                                controller.enqueue(value);
                                return pump();
                            })
                        }
                    },
                })
            })
            .then((stream) => {
                return new Response(stream)
            }).then((response) => response.blob())
            .then((blob) => {
                const aElement = document.createElement('a');
                aElement.setAttribute('download', files[0].name);//todo filenames
                const href = URL.createObjectURL(blob);
                aElement.href = href;
                aElement.setAttribute('target', '_blank');
                aElement.click();
                URL.revokeObjectURL(href);
                action()
            })
        } catch(err) {
            console.error('MULTI-DOWNLOAD-ERROR->', err);
        }
    }

  return (
    <div className={styles.list_container}>
        <div className={styles.list_icon} onClick={(e) => setShow(!show)}>
            {show ? <TfiAngleUp /> : <TfiAngleDown />}
        </div>
        <input type="button" name='download' id="download" value="download selected" className={styles.explorer_header_folderinput} onClick={(e) => download()}/>
        {show && <ul className={styles.list_list}>
            {files && files.map((file: any) => {
                return <li key={file.name}>{file.name}</li>
            })}
            </ul>}
    </div>
  )
}