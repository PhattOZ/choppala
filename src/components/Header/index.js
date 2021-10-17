import styles from "./header.module.scss"
import Link from "next/link"
import Logo from "./logo"
import Logotext from "./logoText"
import SearchBar from "./searchBar"
import UserMenu from "./userMenu"

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <Link href="/">
        <a className={styles.item1}>
          <Logo />
          <Logotext />
        </a>
      </Link>
      <SearchBar className={styles.searchBar} />
      <UserMenu />
    </div>
  )
}
