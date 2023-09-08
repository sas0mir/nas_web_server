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
      })
      if(!res.ok) throw new Error(await res.text())
      else setFile(undefined)
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
          <BreadCrumbs path={folder[0].path} action={(folder: string) => getData(`/${folder}`)} />
          <form onSubmit={submitForm}>
            <input type="file" name='file' id="file" className={styles.explorer_header_fileinput} onChange={e => setFile(e.target.files?.[0])} multiple/>
            <label htmlFor="file">+</label>
            {/* TODO submit on file input event */}
            {file && <input type='text' placeholder={currentFileName} className={styles.explorer_header_nameinput} onChange={(e) => setNewFileName(e.target.value)} />}
            {file && <span className={styles.explorer_header_filetype}>{currentFileType}</span>}
            <input type='submit' value='Upload in folder' className={styles.explorer_header_btn} />
          </form>
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