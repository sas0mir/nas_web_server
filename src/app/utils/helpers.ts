import { prisma } from "@/db";

export const getFileTypeAndName = (name: string) => {
    const nameArray = name ? name.split('.') : [];
    const fileType = nameArray.length ? '.' + nameArray[nameArray.length - 1] : '';
    const fileName = fileType ? name.replace(fileType, '') : '';
    return {fileName, fileType}
  
}

export const connectToDB = async () => {
    try {
        await prisma.$connect();
    } catch(error) {
        console.error('PRISMA-ERROR->', error);
        throw new Error('PRISMA-ERROR-SEE-CONSOLE');
    }
}