import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUser,
  faHistory,
  faHeart,
  faShoppingBasket,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons"
import styles from "src/styles/pages/user.module.scss"

export default function User() {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebar_header}>
          <div>user img</div>
          <div>
            <div>username</div>
            <div>email</div>
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
            <li className={styles.sidebar_list_item}>
              <span>
                <FontAwesomeIcon icon={faSignOutAlt} size={"lg"} />
              </span>
              <div>Logout</div>
            </li>
          </ul>
        </ul>
      </div>
      <div className={styles.main}>
        <div>general info</div>
      </div>
    </div>
  )
}
