"use client"
import styles from '../page.module.css'
import { getFileTypeAndName } from '../utils/helpers';

export default function Viewer(props: any) {

    const {file} = props;

    const {fileName, fileType} = getFileTypeAndName(file.name);
    //TODO
    const getFile = async (path: string) => {
        if (!path) console.log('!PATH ERROR');
        try {
            await fetch(`/api/get?filepath=${path}`, {
                method: 'GET',
            }).then(res => res.json()).then((folder) => {
               // setFolder(folder?.files)
            })
            //setFolder(folder)
        } catch(err) {
            console.error(err)
        }
    }

    const showImage = () => {
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log('TARGET->', e.target);
            const source = e.target?.result || '';
            //return <img src={source} className={styles.viewer_image} />
        }
        reader.readAsBinaryString(file);
        console.log('WIEW->', file);
        return <div></div>
    }

  return (
    <div className={styles.viewer_container}>
        {/* {showImage()} */}
        <p>{file.name}</p>
    </div>
  )
}