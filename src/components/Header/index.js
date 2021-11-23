import styles from "./header.module.scss"
import Link from "next/link"
import Image from "next/image"
import SearchBar from "./searchBar"
import UserMenu from "./userMenu"
import { useEffect, useContext } from "react"
import CartContext from "src/lib/cart-context"

export default function Header() {
  const { header } = useContext(CartContext)
  const [showHeader, setShowHeader] = header

  useEffect(() => {
    let oldScrollY = 0
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
                rel="preload"
              />
            </div>
            <div className={styles.logo_text}>
              <Image
                src="/logoText.png"
                layout="fill"
                objectFit="contain"
                rel="preload"
              />
            </div>
          </a>
        </Link>
      </div>
      <SearchBar />
      <UserMenu />
    </div>
  )
}
