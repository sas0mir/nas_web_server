export const getFileTypeAndName = (name: string) => {
    const nameArray = name ? name.split('.') : [];
    const fileType = nameArray.length ? '.' + nameArray[nameArray.length - 1] : '';
    const fileName = fileType ? name.replace(fileType, '') : '';
    return {fileName, fileType}
  
}