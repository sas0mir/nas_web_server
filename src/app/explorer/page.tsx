"use client"
import styles from '../page.module.css'
import Logs from "../components/logs";
import { useState, useEffect } from 'react';
import Label from '../components/label';
import BreadCrumbs from '../components/bread_crumbs';
import { getFileTypeAndName } from '../utils/helpers';
import Viewer from '../components/viewer';

function Explorer(props: any) {

  const [file, setFile] = useState<File>()
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

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!file) return

    try {
      const data = new FormData()
      if(newFileName) {
        data.set('file', file, `${newFileName}${currentFileType}`);
      } else data.set('file', file)
      const res = await fetch(`/api/upload${folder.length ? '?folder=' + folder[0].path : ''}`, {
        method: 'POST',
        body: data
      }).then((resp => {
        console.log('RESP->', resp)
        if(!resp.ok) throw new Error(resp.statusText)
      else setFile(undefined)
      return resp.json()
      })).then(dataa => console.log('DATA->', dataa))//todo
    } catch (e: any) {
      console.error(e)
    }
  }

  const selectFile = async (file: any, select: boolean, open: boolean) => {
    if(select) {
      const newSelectedArray = [...selected, file];
      setSelected(newSelectedArray);
    }
    if(open) {
      const isFolder = !file.name.split('.')[1]
      const {fileName, fileType} = getFileTypeAndName(file.name);
      if (isFolder) {
        const path = file.path + '/' + file.name;
        getData(path);
      } else {
        setView(file)
        // alert('Sorry can open only folders for now :)')
      }
    }
  }
  
  return (
    <main className={styles.explorer_container}>
        {folder && <header className={styles.explorer_header}>
          <BreadCrumbs path={folder && folder[0] ? folder[0].path : ''} action={(folder: string) => getData(`/${folder}`)} />
          <div className={styles.explorer_header_right}>
            {!newFolderName && <input type="button" name='newfolder' id="newfolder" value="+folder" className={styles.explorer_header_folderinput} onClick={(e) => createNewFolder(false)}/>}
            {newFolderName && <input type='text' placeholder={newFolderName} className={styles.explorer_header_nameinput} onChange={(e) => setNewFolderName(e.target.value)} />}
            {newFolderName && <input type='button' value='Create new folder' className={styles.explorer_header_btn} onClick={(e) => createNewFolder(true)}/>}
            <form onSubmit={submitForm}>
              <input type="file" name='file' id="file" className={styles.explorer_header_fileinput} onChange={e => setFile(e.target.files?.[0])} multiple/>
              {!file && <label htmlFor="file">+file</label>}
              {/* TODO submit on file input event */}
              {file && <input type='text' placeholder={currentFileName} className={styles.explorer_header_nameinput} onChange={(e) => setNewFileName(e.target.value)} />}
              {file && <span className={styles.explorer_header_filetype}>{currentFileType}</span>}
              {file && <input type='submit' value='Upload in folder' className={styles.explorer_header_btn} />}
            </form>
          </div>
          </header>}
        <div className={styles.explorer_grid}>
          {folder && folder.map((file: any) => {
            return <Label key={file.name} name={file.name} path={file.path} action={(select: boolean, open: boolean) => selectFile(file, select, open)} />
          })}
        </div>
        {view && <Viewer file={view} />}
        <footer>
            <Logs />
        </footer>
    </main>
  )
}

export default Explorer