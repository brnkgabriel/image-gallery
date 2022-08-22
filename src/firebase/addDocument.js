import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "./config"

const addDocument = (collectionName, documentOb, id) => {
  const docRef = doc(collection(db, collectionName), id)
  return setDoc(docRef, { ...documentOb, timestamp: serverTimestamp() }, { merge: true })
}

export default addDocument