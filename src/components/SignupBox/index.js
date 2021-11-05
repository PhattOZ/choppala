import Link from "next/link"
import { signIn } from "next-auth/react"
// Styles
import styles from "./SignupBox.module.css"
// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookF,
  faGoogle,
  faLine,
} from "@fortawesome/free-brands-svg-icons"

export default function SignupBox() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Welcome to Choppala!</h3>
      <div className={styles.orContinueBox}>
        <p className={styles.orContinueText}>
          <span>Continue with</span>
        </p>
      </div>
      <div className={`${styles.childBox} ${styles.oauthButtons}`}>
        <button
          className={styles.facebookButton}
          onClick={() => signIn("facebook", { callbackUrl: "/user" })}
        >
          <div className={styles.socialIcon}>
            <FontAwesomeIcon icon={faFacebookF} />
            <span className={styles.provider}>Facebook</span>
          </div>
        </button>
        <button
          className={styles.googleButton}
          onClick={() => {
            signIn("google", { callbackUrl: "/user" })
          }}
        >
          <div className={styles.socialIcon}>
            <FontAwesomeIcon icon={faGoogle} />
            <span className={styles.provider}>Google</span>
          </div>
        </button>
        <button
          className={styles.lineButton}
          onClick={() => {
            signIn("line", { callbackUrl: "/user" })
          }}
        >
          <div className={styles.socialIcon}>
            <FontAwesomeIcon icon={faLine} size="lg" />
            <span className={styles.provider}>LINE</span>
          </div>
        </button>
      </div>
    </div>
  )
}
