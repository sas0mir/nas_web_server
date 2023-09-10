"use client"
import styles from '../page.module.css'
import { getFileTypeAndName } from '../utils/helpers';

export default function Viewer(props: any) {

    const {file} = props;

    const {fileName, fileType} = getFileTypeAndName(file.name);
    //TODO
    const getFile = (path: string) => {
        if (!path) console.log('!PATH ERROR');
        console.log('PATH->', path);
        try {
            fetch(`/api/get?filepath=${path}`, {
                method: 'GET',
            }).then(res => {
                return res.body?.getReader().read()
            }).then((stream) => {
                //let decoder = new TextDecoder('utf-8)
                //const {value, done} = stream;
                //decoder.decode(value)
                console.log('STREAM->', stream);
            })
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
        <video controls muted autoPlay>
            <source src={`/api/get?filepath=${file.path}/${file.name}`} type="video/mp4" />
        </video>
        {showImage()}
        <p>{file.name}</p>
    </div>
  )
}