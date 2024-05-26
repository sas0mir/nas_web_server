import '../ui/server_styles.css';
import { getFileTypeAndName } from './helpers';
export default function Upload(props: any) {
    
    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log("SUBMITTT->", e.currentTarget["file"].files[0], e.currentTarget["filename"].value);
        if(!e.currentTarget) return
        const data = new FormData();
        const file = e.currentTarget["file"].files[0]; //{name, size, type, lastModified, webkitRelativePath}
        const {fileName, fileType} = getFileTypeAndName(file.name);
        const newFileName = e.currentTarget["filename"].value;
        if(newFileName) {
          data.append('file', file, `${newFileName}${fileType}`);
        } else data.append('file', file)
    
        // //using simple writeFile upload if size < 10 or filestream for bigger files
        // if(file.size < 10000000) {
        //   try {
        //     const res = await fetch(`/api/upload${folder.length ? '?folder=' + folder[0].path : ''}`, {
        //       method: 'POST',
        //       body: data
        //     }).then((resp => {
        //       if(!resp.ok) throw new Error(resp.statusText)
        //     else setFile(undefined)
        //     return resp.json()
        //     })).then(dataa => console.log('DATA->', dataa))//todo
        //   } catch (e: any) {
        //     console.error(e)
        //   }
        // } else {
        //   const uploadConfig: AxiosRequestConfig = {
        //     onUploadProgress: function(progressEvent) {
        //       let total = progressEvent.total || file.size;
        //       const percentComplete = Math.round((progressEvent.loaded * 100) / total);
        //       setUploadProgress(percentComplete);
        //     }
        //   }
    
        //   try {
        //     await axios.post(`/api/uploadstream?folder=${location}/${currentFileName}${currentFileType}`, data, uploadConfig);
        //   } catch(e) {
        //     console.error('UPLOAD-ERROR->', e);
        //   } finally {
        //     setUploadProgress(0);
        //     setFile(undefined);
        //   }
        // }
    }

    console.log('SRVR-UPLOAD->', document.forms[0]);
    
    return (
        <form onSubmit={submitForm} name="upload_form">
              <input type="file" name='file' id="file" className="explorer_header_fileinput"/>
              <label htmlFor="file">+file</label>
              <input type='text' placeholder="currentFileName" id="filename" name="filename" className="explorer_header_nameinput"/>
              <span className="explorer_header_filetype">filetype</span>
              <input type="submit" value="Upload in folder" className="explorer_header_btn" />
        </form>
    )
}