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
import styles from "src/styles/pages/user.module.scss"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function User() {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin") // ถ้า user ยังไม่ได้ Login ให้ redirect ไปหน้า /signin
    },
  })

  // Loading session
  if (status === "loading") {
    return <h1>Loading...</h1>
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebar_header}>
          <div className={styles.sidebar_user_img}>
            <Image src={session.user.image} layout="fill" objectFit="cover" />
          </div>
          <div>
            <div>{session.user.name}</div>
            <div>{session.user.email}</div>
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
      <div className={styles.main}>
        <div>
          <div>General Information</div>
        </div>
      </div>
    </div>
  )
}
