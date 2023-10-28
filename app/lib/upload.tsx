import styles from '../ui/global.module.css';
import { submitUpload } from '../lib/actions';
export default function Upload(props: any) {
    const {folder} = props;
    //passing arguments to server action
    const submitUploadCustom = submitUpload.bind(null, folder);
    
    return (
        <form action={submitUploadCustom}>
              <input type="file" name='file' id="file" className={styles.explorer_header_fileinput}/>
              <label htmlFor="file">+file</label>
              <input type='text' name='new_file_name' placeholder="change file name" className={styles.explorer_header_nameinput}/>
              <input type='submit' value='Upload in folder' className={styles.explorer_header_btn} />
        </form>
    )
}