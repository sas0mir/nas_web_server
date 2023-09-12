"use client"
import { useEffect, useState } from 'react';
import styles from '../page.module.css';

export default function Viewer(props: any) {

    const {file} = props;

    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        getFile(file.path + '/' + file.name);
    }, [])
    //TODO
    const getFile = (path: string) => {
        if (!path) console.log('!PATH ERROR');
        console.log('PATH->', path);
        try {
            fetch(`/api/get?filepath=${path}`, {
                method: 'GET',
            }).then(res => {
                const reader = res.body?.getReader();
                const totalSize = Number(res.headers.get('Content-Length'));
                const mimeType = res.headers.get('Content-Type');
                console.log('W-1->', reader);
                return new ReadableStream({
                    start(controller) {
                        return pump();
                        function pump(): any {
                            return reader?.read().then(({done, value}) => {
                                if(done) {
                                    controller.close();
                                    return
                                }
                                setPercentage(Math.floor((value.length/totalSize) * 100))
                                controller.enqueue(value);
                                return pump();
                            });
                        }
                    },
                });
            }).then((stream) => new Response(stream))
            .then((response) => response.blob())
            .then((blob) => URL.createObjectURL(blob))
            .then((url) => {
                document.getElementById('preview')?.setAttribute('src', url);
            })
            .catch((err) => console.error(err))
            //setFolder(folder)
        } catch(err) {
            console.error(err)
        }
    }

    const showImage = () => {
        //const fileStream = await getFile(file.path + '/' + file.name)
        // const reader = new FileReader();
        // reader.onload = (e) => {
        //     console.log('TARGET->', e.target);
        //     const source = e.target?.result || '';
        //     //return <img src={source} className={styles.viewer_image} />
        // }
        // reader.readAsBinaryString(file);
        // console.log('WIEW->', file);
        return <div>image</div>
    }

  return (
    <div className={styles.viewer_container}>
        <img id="preview" />
        <p>{file.name}</p>
        <p>{percentage}</p>
    </div>
  )
}