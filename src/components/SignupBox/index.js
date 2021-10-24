import Link from "next/link"
import { signIn } from "next-auth/react"
// Styles
import styles from "./SignupBox.module.css"
// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons"

export default function SignupBox() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Create your Choppala Account</h3>
      <div className={`${styles.childBox} ${styles.inputPart}`}>
        <label>Email</label>
        <input
          className={styles.inputBox}
          type="text"
          placeholder="Please enter your email"
        />
      </div>
      <div className={`${styles.childBox} ${styles.inputPart}`}>
        <label>Password</label>
        <input
          className={styles.inputBox}
          type="password"
          placeholder="Please enter your password"
        />
      </div>
      <div className={`${styles.childBox} ${styles.checkboxPart}`}>
        <input type="checkbox" required />
        <label>
          I've read and agree to{" "}
          <Link href="/termsandconditions">
            <a target="_blank" className={styles.linkText}>
              Terms & Conditions
            </a>
          </Link>
        </label>
      </div>
      <button className={`${styles.childBox} ${styles.signupButton}`}>
        SIGN UP
      </button>
      <div className={styles.orSignupWithBox}>
        <p className={styles.orSignupWithText}>
          <span>OR Sign up with</span>
        </p>
      </div>
      <div className={`${styles.childBox} ${styles.oauthButtons}`}>
        <button
          className={styles.facebookButton}
          onClick={() => signIn("facebook", { callbackUrl: "/user" })}
        >
          <div className={styles.socialIcon}>
            <FontAwesomeIcon icon={faFacebookF} />
          </div>
          Facebook
        </button>
        <button
          className={styles.googleButton}
          onClick={() => {
            signIn("google", { callbackUrl: "/user" })
          }}
        >
          <div className={styles.socialIcon}>
            <FontAwesomeIcon icon={faGoogle} />
          </div>
          Google
        </button>
      </div>
      <p className={styles.signinText}>
        Already have an account?{" "}
        <Link href="/signin">
          <a className={styles.linkText}>Log in</a>
        </Link>
      </p>
    </div>
  )
}
