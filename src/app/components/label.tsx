"use client"
import { useState } from 'react';
import styles from '../page.module.css'
//icons for folder, image, music, video and text file types
import {TfiFolder, TfiImage, TfiMusicAlt, TfiControlPlay, TfiFile} from 'react-icons/tfi'

export default function Label(props: any) {

    const {name, path, action} = props;

    const [selected, setSelected] = useState(false);

    const icon = () => {
        const nameArray = name.split('.');
        const type = nameArray.length > 1 ? nameArray[nameArray.length - 1] : '';
        switch(type) {
            case '':
                return <TfiFolder />
            case 'png':
            case 'jpeg':
            case 'jpg':
            case 'gif':
            case 'tiff':
            case 'raw':
            case 'webp':
            case 'jfif':
            case 'pjpeg':
            case 'pjp':
                return <TfiImage />
            case 'm4a':
            case 'flac':
            case 'mp3':
            case 'wav':
            case 'wma':
            case 'aac':
                return <TfiMusicAlt />
            case 'mp4':
            case 'mov':
            case 'wmv':
            case 'avi':
            case 'avchd':
            case 'flv':
            case 'f4v':
            case 'swf':
            case 'mkv':
            case 'matroska':
            case 'webm':
            case 'mpeg2':
                return <TfiControlPlay />
            default: 
                return <TfiFile />
        }
    }

    const handleIconClick = (e: any) => {
        setSelected(!selected)
        action(selected, false)
    }

    const handleIconDoubleClick = (e: any) => {
        action(selected, true)
    }

  return (
    <div className={styles.icon_container}>
        <div className={selected ? styles.icon_box_selected : styles.icon_box} onClick={handleIconClick} onDoubleClick={handleIconDoubleClick}>
            {icon()}
        </div>
        <p className={styles.icon_text}>{name}</p>
        {name.length > 18 && <div className={styles.icon_tooltip}>{name}</div>}
    </div>
  )
}