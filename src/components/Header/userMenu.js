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
import { useSession, signOut } from "next-auth/react"
import { useState, useContext } from "react"
import CartContext from "src/lib/cart-context"

export default function userMenu() {
  const { data: session, status } = useSession()
  const [isHamburgerActive, setIsHamburgerActive] = useState(false)
  const ctx = useContext(CartContext)

  const toggleHamburger = () => {
    setIsHamburgerActive(!isHamburgerActive)
  }

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
        <Link href="/cart">
          <a>
            <FontAwesomeIcon icon={faShoppingCart} size={"lg"} />
          </a>
        </Link>
        <Link href={status === "authenticated" ? "/user" : "/signup"}>
          <a>
            {status === "authenticated" ? (
              <div className={styles.user_image}>
                <Image
                  src={session.user.image}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            ) : (
              <FontAwesomeIcon icon={faUserCircle} size={"lg"} />
            )}
          </a>
        </Link>
      </div>

      <div className={styles.concise_menu}>
        <div className={styles.concise_cart}>
          <Link href="/cart">
            <a>
              <FontAwesomeIcon icon={faShoppingCart} size={"lg"} />
            </a>
          </Link>
        </div>
        <div
          className={`${styles.hamburger} ${
            isHamburgerActive ? styles.toggle : ""
          }`}
          onClick={toggleHamburger}
        >
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
          <div className={styles.line3}></div>
          <ul className={styles.dropdown_menu}>
            <li>
              <Link href="/user">
                <a>user</a>
              </Link>
            </li>
            <li>favorite</li>
            <li onClick={() => signOut()}>logout</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
