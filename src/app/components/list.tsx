"use client"
import { useState } from 'react';
import styles from '../page.module.css';
import {TfiAngleDown, TfiAngleUp} from 'react-icons/tfi';

export default function List(props: any) {

    const {files} = props;
    const [show, setShow] = useState(false);

    const download = async() => {
        try {
            fetch(`/api/getmulti`, {
                method: 'POST',
                mode: 'no-cors',
                referrerPolicy: 'no-referrer',
                body: files
            }).then((res) => {
                console.log('RES->', res);
                res.blob()
            })
            .then((res_blob) => {
                console.log('BLOB->', res_blob);
                // const aElement = document.createElement('a');
                // aElement.setAttribute('download', 'filename');//todo filenames
                // const href = URL.createObjectURL(res_blob);
                // aElement.href = href;
                // aElement.setAttribute('target', '_blank');
                // aElement.click();
                // URL.revokeObjectURL(href);
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