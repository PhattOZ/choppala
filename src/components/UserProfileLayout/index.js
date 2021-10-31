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
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router"

function SidebarItem({ children, content, link }) {
  return (
    <Link href={link ? link : "/"}>
      <a>
        <li className={styles.sidebar_list_item}>
          <span>{children}</span>
          <div>{content}</div>
        </li>
      </a>
    </Link>
  )
}

export default function Layout({ children }) {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <h1>Loading...</h1>
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebar_header}>
          <div className={styles.sidebar_user_img}>
            <Image src={session.user.image} layout="fill" objectFit="cover"/>
          </div>
          <div>
            <div className={styles.bold}>{session.user.name}</div>
            <div className={styles.email}>{session.user.email}</div>
          </div>
        </div>
        <ul>
          <ul className={styles.sidebar_list}>
            <SidebarItem content="Profile" link="/me">
              <FontAwesomeIcon icon={faUser} size={"lg"} />
            </SidebarItem>

            <SidebarItem content="Purchase history" link="/me/purchasehistory">
              <FontAwesomeIcon icon={faHistory} size={"lg"} />
            </SidebarItem>

            <SidebarItem content="Wishlist" link="/me/wishlist">
              <FontAwesomeIcon icon={faHeart} size={"lg"} />
            </SidebarItem>
          </ul>
          <ul className={styles.sidebar_list}>
            <SidebarItem content="Manage store" link="/me/managestore">
              <FontAwesomeIcon icon={faStore} size={"lg"} />
            </SidebarItem>

            <SidebarItem content="Selling orders" link="/me/sellingorders">
              <FontAwesomeIcon icon={faTags} size={"lg"} />
            </SidebarItem>
          </ul>
          <ul className={styles.sidebar_list}>
            <SidebarItem content="Settings">
              <FontAwesomeIcon icon={faCog} size={"lg"} />
            </SidebarItem>

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
