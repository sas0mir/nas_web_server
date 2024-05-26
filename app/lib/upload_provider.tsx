"use client"

import styles from '../ui/global.module.css';
import { submitUpload } from '../lib/actions';
export default function UploadProvider({
    children
  }: {
    children: React.ReactNode,
  }) {
    //const {folder} = props;
    //passing arguments to server action
    //const submitUploadCustom = submitUpload.bind(null, folder);
    
    return (
        <div className={styles.upload_provider}>
          {children}
        </div>
    )
}