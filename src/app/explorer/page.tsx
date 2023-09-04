"use client"
import styles from '../page.module.css'
import Logs from "../components/logs";
import { useState, useEffect } from 'react';
import Label from '../components/label';
import BreadCrumbs from '../components/bread_crumbs';

function Explorer(props: any) {

  const [file, setFile] = useState<File>()
  const [folder, setFolder] = useState<any>()
  const [selected, setSelected] = useState<any>([])

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
      data.set('file', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      if(!res.ok) throw new Error(await res.text())
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
      if (isFolder) {
        const path = file.path + '/' + file.name;
        getData(path);
      } else alert('Sorry can open only folders for now :)')
    }
  }
  
  return (
    <main className={styles.explorer_container}>
        {folder && <header className={styles.explorer_header}>
          <BreadCrumbs path={folder[0].path} action={(folder: string) => getData(`/${folder}`)} />
          <form onSubmit={submitForm}>
            <input type="file" name='file' id="file" className={styles.explorer_header_fileinput} onChange={e => setFile(e.target.files?.[0])} />
            <label htmlFor="file">+</label>
            {/* TODO submit on file input event */}
            <input type='submit' value='Upload in folder' className={styles.explorer_header_btn} />
          </form>
          </header>}
        <div className={styles.explorer_grid}>
          {folder && folder.map((file: any) => {
            return <Label key={file.name} name={file.name} path={file.path} action={(select: boolean, open: boolean) => selectFile(file, select, open)} />
          })}
        </div>
        <footer>
            <Logs />
        </footer>
    </main>
  )
}

export default Explorer