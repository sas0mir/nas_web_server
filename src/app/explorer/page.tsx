"use client"
import styles from '../page.module.css'
import Logs from "../components/logs";
import { useState, useEffect } from 'react';

function Explorer(props: any) {

  const [file, setFile] = useState<File>()
  const [folder, setFolder] = useState<any>()

  // useEffect(() => {
  //   getData('root')
  // })

  const getData = async (path: string) => {
    try {
      await fetch(`/api/show${path ? '?folder='+ path : ''}`, {
        method: 'GET',
      }).then(res => res.json()).then((folder) => {
        console.log('FOLDER->', folder);
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
  
  return (
    <main className={styles.explorer_container}>
        <h2>EXPLORER</h2>
        {folder && <h4>{folder[0]?.path}</h4>}
        {folder && folder.map((file: any) => {
          return <p key={file?.name}>{file?.name}</p>
        })}
        <input type="button" value="GET" onClick={e => getData('root')}/>
        <form onSubmit={submitForm}>
          <input type="file" name='file' onChange={e => setFile(e.target.files?.[0])} />
          <input type='submit' value='Upload' />
        </form>
        <footer>
            <Logs />
        </footer>
    </main>
  )
}

export default Explorer