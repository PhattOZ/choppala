import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUser,
  faHistory,
  faHeart,
  faShoppingBasket,
  faCog,
  faSignOutAlt,
  faTags,
  faStore,
} from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import Link from "next/link"
import styles from "./UserProfileLayout.module.scss"
import { signOut } from "next-auth/react"
import { useRouter } from "next/router"

function SidebarItem({ children, content, path }) {
  const router = useRouter()
  const style =
    router.asPath == path
      ? `${styles.sidebar_list_item} ${styles.blue}`
      : styles.sidebar_list_item
  return (
    <Link href={path ? path : "/"}>
      <a>
        <li className={style}>
          <span>{children}</span>
          <div>{content}</div>
        </li>
      </a>
    </Link>
  )
}

export default function Layout({ children, user }) {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebar_header}>
          <div className={styles.sidebar_user_img}>
            <Image
              src={user.image}
              layout="fill"
              objectFit="cover"
              alt="User profile"
            />
          </div>
          <div>
            <div className={styles.bold}>{user.name}</div>
            <div className={styles.email}>{user.email}</div>
          </div>
        </div>
        <ul>
          <ul className={styles.sidebar_list}>
            <SidebarItem content="Profile" path="/me">
              <FontAwesomeIcon icon={faUser} size={"lg"} />
            </SidebarItem>

            <SidebarItem content="Purchase history" path="/me/purchasehistory">
              <FontAwesomeIcon icon={faHistory} size={"lg"} />
            </SidebarItem>

            <SidebarItem content="Wishlist" path="/me/wishlist">
              <FontAwesomeIcon icon={faHeart} size={"lg"} />
            </SidebarItem>
          </ul>
          <ul className={styles.sidebar_list}>
            <SidebarItem content="Manage store" path="/me/managestore">
              <FontAwesomeIcon icon={faStore} size={"lg"} />
            </SidebarItem>

            <SidebarItem content="Selling orders" path="/me/sellingorders">
              <FontAwesomeIcon icon={faTags} size={"lg"} />
            </SidebarItem>
          </ul>
          <ul className={styles.sidebar_list}>
            <SidebarItem content="Settings">
              <FontAwesomeIcon icon={faCog} size={"lg"} />
            </SidebarItem>

            <li
              className={`${styles.sidebar_list_item} ${styles.signout}`}
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
