"use client"
import styles from '../page.module.css'
import { useState, useEffect } from 'react';

export default function Logs(props: any) {

    const [show, setShow] = useState(false)
    const [logs, setLogs] = useState([{id: '', operation: '', path: '', date: new Date()}])

    useEffect(() => {
        //todo API fetch pisma.logs.fingManY() import prisma from @/db
    }, [show])

  return (
    <main className={styles.logs_container}>
        <input type="button" className={styles.logs_show_btn} onClick={e => setShow(!show)} value={show ? 'hide logs' : 'show logs'} />
        <div className={styles.logs_list}>
            {logs && logs.map((log, idx) => {
                return <span key={log.id}>{`${log.id} ${log.operation} ${log.path} ${log.date.toDateString()}`}</span>
            })}
        </div>
    </main>
  )
}