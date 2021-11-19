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
  const imgUrls = []
  await Promise.all(
    imgBlobs.map(async (blob) => {
      if (blob) {
        const filename = blob.name
        const fullname = new Date().getTime().toString() + "-" + filename
        const fileRef = ref(storageRef, `/${fullname}`)
        const snapshot = await uploadBytes(fileRef, blob)
        const url = await getDownloadURL(snapshot.ref)
        imgUrls.push(url)
      }
    })
  )
  return imgUrls
}
