import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxctCgcZ4AXZGYUvfPdVI7J-qbrCHdqqI",
  authDomain: "choppala-12345.firebaseapp.com",
  projectId: "choppala-12345",
  storageBucket: "choppala-12345.appspot.com",
  messagingSenderId: "207614988549",
  appId: "1:207614988549:web:72805892f528d012dd276c",
}

export default async function createImgUrls(imgBlobs) {
  const firebaseApp = initializeApp(firebaseConfig) // Initialize Firebase
  const storageRef = getStorage(firebaseApp) // Connect to root storage
  const results = await Promise.all(
    imgBlobs.map(async (blob) => {
      if (blob && !!blob.name) {
        const filename = blob.name
        const fullname = new Date().getTime().toString() + "-" + filename
        const fileRef = ref(storageRef, `/${fullname}`)
        const snapshot = await uploadBytes(fileRef, blob)
        return getDownloadURL(snapshot.ref)
      } else {
        return blob
      }
    })
  )
  const filterNull = results.filter((i) => i) // remove null value(s) in array
  return filterNull
}
