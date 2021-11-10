import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxctCgcZ4AXZGYUvfPdVI7J-qbrCHdqqI",
  authDomain: "choppala-12345.firebaseapp.com",
  projectId: "choppala-12345",
  storageBucket: "choppala-12345.appspot.com",
  messagingSenderId: "207614988549",
  appId: "1:207614988549:web:72805892f528d012dd276c",
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Connect to root storage
const storage = getStorage(firebaseApp)

export const upload = (filename, file) => {
  const fullname = new Date().getTime().toString() + "-" + filename
  const storageRef = ref(storage, `/${fullname}`)
  uploadBytes(storageRef, file).then(({ ref }) => {
    getDownloadURL(ref).then((url) => {
      console.log("url: " + url)
    })
  })
}
