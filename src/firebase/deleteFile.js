import { deleteObject, listAll, ref } from "firebase/storage"
import { storage } from "./config"

const deleteFile = (filePath) => {
  const imageRef = ref(storage, filePath)
  return deleteObject(imageRef)
}

export const deleteAll = async (folderPath) => {
  const listRef = ref(storage, folderPath)

  const res = await listAll(listRef)
  res.items.map(deleteObject)
}

export default deleteFile
