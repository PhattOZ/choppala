import Link from "next/link"
import { signIn } from "next-auth/react"
// Styles
import styles from "./SignupBox.module.scss"
// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookF,
  faGoogle,
  faGithub,
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
            <FontAwesomeIcon icon={faFacebookF}/>
          </div>
          <span className={styles.provider}>Facebook</span>
        </button>
        <button
          className={styles.googleButton}
          onClick={() => {
            signIn("google", { callbackUrl: "/user" })
          }}
        >
          <div className={styles.socialIcon}>
            <FontAwesomeIcon icon={faGoogle}/>
          </div>
          <span className={styles.provider}>Google</span>
        </button>
        <button
          className={styles.githubButton}
          onClick={() => {
            signIn("github", { callbackUrl: "/user" })
          }}
        >
          <div className={styles.socialIcon}>
            <FontAwesomeIcon icon={faGithub} size="lg"/>
          </div>
          <span className={styles.provider}>Github</span>
        </button>
      </div>
    </div>
  )
}
