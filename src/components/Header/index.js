import styles from "./header.module.scss"
import Link from "next/link"
import Image from "next/image"
import SearchBar from "./searchBar"
import UserMenu from "./userMenu"
import { useState, useEffect } from "react"

export default function Header() {
  const [show, setShow] = useState(true)

  const headerHandler = () => {
    if (window.scrollY > 100) {
      setShow(false)
    } else {
      setShow(true)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", headerHandler)
    return () => {
      window.removeEventListener("scroll", headerHandler)
    }
  }, [])

  return (
    <div className={`${styles.headerContainer} ${!show && styles.hide_header}`}>
      <div className={styles.logo}>
        <Link href="/">
          <a>
            <div className={styles.logo_image}>
              <Image
                src="/logo.png"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
            <div className={styles.logo_text}>
              <Image
                src="/logoText.png"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </a>
        </Link>
      </div>
      <SearchBar className={styles.searchBar} />
      <UserMenu />
    </div>
  )
}
