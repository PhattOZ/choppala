import styles from "./header.module.scss"
import Link from "next/link"
import Image from "next/image"
import SearchBar from "./searchBar"
import UserMenu from "./userMenu"

export default function Header() {
  return (
    <div className={styles.headerContainer}>
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
