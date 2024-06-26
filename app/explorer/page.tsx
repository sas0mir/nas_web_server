"use client"
import styles from '../ui/global.module.css'
import Logs from "../lib/logs";
import { useState, useEffect } from 'react';
import Label from '../lib/label';
import BreadCrumbs from '../lib/bread_crumbs';
import { getFileTypeAndName } from '../lib/helpers';
import Viewer from '../lib/viewer';
import List from '../lib/list';
import axios, { AxiosRequestConfig } from "axios";
import mime from 'mime';
import UploadProvider from '../lib/upload_provider';
import Upload from '@/lib/upload';
import { useSession } from 'next-auth/react';

function Explorer(props: any) {

  const {data: session, status} = useSession();
  console.log('EXPLORER-SESSION->', session, status);
  //file to upload & upload progress 
  const [file, setFile] = useState<File | undefined>();
  const [uploadProgress, setUploadProgress] = useState(0);

  const [location, setLocation] = useState<string>('/media/sas/DRIVE_D');
  const [folder, setFolder] = useState<any>()
  const [selected, setSelected] = useState<any>([])
  const [newFileName, setNewFileName] = useState<string>('')
  const [newFolderName, setNewFolderName] = useState<string>('')
  const [view, setView] = useState<File>()

  const currentFileNameArray = file ? file.name.split('.') : [];
  const currentFileType = currentFileNameArray.length ? '.' + currentFileNameArray[currentFileNameArray.length - 1] : '';
  const currentFileName = currentFileType ? file?.name.replace(currentFileType, '') : '';

  useEffect(() => {
    if (!folder) getData('root')
  }, [folder])

  const getData = async (path: string) => {
    try {
      await fetch(`/api/show${path ? '?folder='+ path : ''}`, {
        method: 'GET',
      }).then(res => res.json()).then((folder) => {
        setFolder(folder?.files)
      })
      //setFolder(folder)
    } catch(err) {
      console.error(err)
    }
  }

  const createNewFolder = async (ready: boolean) => {
    if (!ready) setNewFolderName('new folder name')
    else {
      const res = await fetch(`/api/createfolder?path=${folder[0].path}/${newFolderName}`, {method: 'POST'}).then((res) => {
        return res.json()
      }).then((response) => {
        console.log('CREATE-FOLDER->', response)
      })
      setNewFolderName('');
      getData(folder[0].path);
    }
  }

  const clearSelected = () => {
    setSelected([])
  }

  const selectFile = async (file: any, select: boolean, open: boolean) => {
    const type = mime.getType(file.name);
    if(select && type) {
      const newSelectedArray = [...selected, file];
      setSelected(newSelectedArray);
    }
    if(!select && !open && selected.length) {
      const newSelectedArray = selected.filter((f:any) => f.name !== file.name);
      setSelected(newSelectedArray);
    }
    if(open) {
      const {fileName, fileType} = getFileTypeAndName(file.name);
      if (!type) {
        const path = file.path + '/' + file.name;
        setLocation(path);
        getData(path);
      } else {
        setView(file)
      }
    }
  }

  return (
    <main className={styles.explorer_container}>
      {/* check session && status to show explorer */}
        {folder && <header className={styles.explorer_header}>
          <BreadCrumbs path={location ? location : folder.length ? folder[0].path : ''} action={(folder: string) => {
            getData(`/${folder}`);
            setLocation(`/${folder}`);
            }} />
          <div className={styles.explorer_header_right}>
            {selected.length ? <List files={selected} action={clearSelected} /> : null}
            {!newFolderName && <input type="button" name='newfolder' id="newfolder" value="+folder" className={styles.explorer_header_folderinput} onClick={(e) => createNewFolder(false)}/>}
            {newFolderName && <input type='text' placeholder={newFolderName} className={styles.explorer_header_nameinput} onChange={(e) => setNewFolderName(e.target.value)} />}
            {newFolderName && <input type='button' value='Create new folder' className={styles.explorer_header_btn} onClick={(e) => createNewFolder(true)}/>}
            <UploadProvider>
              <Upload />
            </UploadProvider>
          </div>
          </header>}
        <div className={styles.explorer_grid}>
          {folder && folder.map((file: any) => {
            return <Label key={file.name} name={file.name} path={file.path} action={(select: boolean, open: boolean) => selectFile(file, select, open)} />
          })}
        </div>
        {view && null
          /* <Viewer file={view}> */
            /* <div>viewer server component</div> */
          /* </Viewer> */
        }
        <footer>
            <Logs />
        </footer>
    </main>
  )
}

export default Explorer