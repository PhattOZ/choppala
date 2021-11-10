import { useRef, useState } from "react"
import { upload } from "src/lib/firebase"
import Image from "next/dist/client/image"

export default function Wishlist() {
  const refe = useRef(null)
  const [imgUrl, setImgURL] = useState()

  const handleUpload = (e) => {
    const [file] = e.target.files

    if (file) {
      const url = URL.createObjectURL(file)
      setImgURL(url)
    }

    if (file) {
      const filename = encodeURIComponent(file.name)
      upload(filename, file)
    }
  }

  return (
    <div>
      <div ref={refe}>to be added</div>
      {imgUrl ? <Image src={imgUrl} width={200} height={200} /> : ""}

      <input
        type="file"
        onChange={handleUpload}
        accept="image/jpeg image/png"
      />
    </div>
  )
}
