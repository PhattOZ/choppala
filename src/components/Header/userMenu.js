import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUserCircle,
  faGlobe,
  faShoppingCart,
  faHeart,
} from "@fortawesome/free-solid-svg-icons"
import { faBell, faQuestionCircle } from "@fortawesome/free-regular-svg-icons"
import Link from "next/link"
import styles from "./header.module.scss"
import Image from "next/image"
import { useSession } from "next-auth/react"

export default function userMenu() {
  const { data: session, status } = useSession()

  // if (status === "loading") {
  //   return <></>
  // }

  return (
    <div className={styles.containerSide}>
      <div className={styles.menu}>
        <Link href="/">
          <a className={styles.fabell}>
            <FontAwesomeIcon icon={faBell} size={"lg"} /> Notification
          </a>
        </Link>
        <Link href="/">
          <a className={styles.faQuestionCircle}>
            <FontAwesomeIcon icon={faQuestionCircle} size={"lg"} /> Help
          </a>
        </Link>
        <Link href="/">
          <a className={styles.faGlobe}>
            <FontAwesomeIcon icon={faGlobe} size={"lg"} /> EN
          </a>
        </Link>
      </div>

      <div className={styles.userMenu}>
        <Link href="/user">
          <a>
            <FontAwesomeIcon icon={faHeart} size={"lg"} />
          </a>
        </Link>
        <Link href="/user">
          <a>
            <FontAwesomeIcon icon={faShoppingCart} size={"lg"} />
          </a>
        </Link>
        <Link href="/user">
          <a>
            {status === "authenticated" ? (
              <Image src={session.user.image} width="150" height="150" />
            ) : (
              <FontAwesomeIcon icon={faUserCircle} size={"lg"} />
            )}
          </a>
        </Link>
      </div>
    </div>
  )
}
