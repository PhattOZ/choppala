import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUser,
  faHistory,
  faHeart,
  faShoppingBasket,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import styles from "./UserProfileLayout.module.scss"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router"

export default function Layout({ user, currentRoute, children }) {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <h1>Loading...</h1>
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div>{currentRoute}</div>
        <div className={styles.sidebar_header}>
          <div className={styles.sidebar_user_img}>
            <Image src={session.user.image} layout="fill" objectFit="cover" />
          </div>
          <div>
            <div className={styles.bold}>{session.user.name}</div>
            <div className={styles.email}>{session.user.email}</div>
          </div>
        </div>
        <ul>
          <ul className={styles.sidebar_list}>
            <li className={styles.sidebar_list_item}>
              <span>
                <FontAwesomeIcon icon={faUser} size={"lg"} />
              </span>
              <div>Profile</div>
            </li>
            <li className={styles.sidebar_list_item}>
              <span>
                <FontAwesomeIcon icon={faHistory} size={"lg"} />
              </span>
              <div>Purchase history</div>
            </li>
            <li className={styles.sidebar_list_item}>
              <span>
                <FontAwesomeIcon icon={faHeart} size={"lg"} />
              </span>
              <div>Wishlist</div>
            </li>
          </ul>
          <ul className={styles.sidebar_list}>
            <li className={styles.sidebar_list_item}>
              <span>
                <FontAwesomeIcon icon={faShoppingBasket} size={"lg"} />
              </span>
              <div>Manage stall</div>
            </li>
          </ul>
          <ul className={styles.sidebar_list}>
            <li className={styles.sidebar_list_item}>
              <span>
                <FontAwesomeIcon icon={faCog} size={"lg"} />
              </span>
              <div>Settings</div>
            </li>
            <li
              className={styles.sidebar_list_item}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <span>
                <FontAwesomeIcon icon={faSignOutAlt} size={"lg"} />
              </span>
              <div>Logout</div>
            </li>
          </ul>
        </ul>
      </div>
      {children}
    </div>
  )
}
