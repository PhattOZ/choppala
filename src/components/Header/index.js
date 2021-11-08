import styles from "./header.module.scss"
import Link from "next/link"
import Image from "next/image"
import SearchBar from "./searchBar"
import UserMenu from "./userMenu"
import { useState, useEffect } from "react"

export default function Header() {
  let oldScrollY = 0

  const [showHeader, setShowHeader] = useState(true)

  useEffect(() => {
    const controlDirection = () => {
      if (window.scrollY > oldScrollY) {
        setShowHeader(false)
      } else {
        setShowHeader(true)
      }
      oldScrollY = window.scrollY
    }
    window.addEventListener("scroll", controlDirection)
    return () => {
      window.removeEventListener("scroll", controlDirection)
    }
  }, [])

  return (
    <div
      className={`${styles.headerContainer} ${
        !showHeader && styles.hide_header
      }`}
    >
      <div className={styles.logo}>
        <Link href="/">
          <a>
            <div className={styles.logo_image}>
              <Image
                src="/logo.png"
                layout="fill"
                objectFit="contain"
                priority
                alt="Choppala logo"
                rel="preload"
              />
            </div>
            <div className={styles.logo_text}>
              <Image
                src="/logoText.png"
                layout="fill"
                objectFit="contain"
                priority
                alt="Logo text"
                rel="preload"
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
