import Link from "next/link"
import Image from "next/image"
import { signIn } from "next-auth/react"
// Styles
import styles from "./SignupBox.module.css"
import { useState } from "react"

export default function SignupBox() {
  const [email, setEmail] = useState("")

  const handleChange = (event) => {
    const value = event.target.value
    setEmail(value)
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Create your Choppala Account</h3>
      <div className={`${styles.childBox} ${styles.inputPart}`}>
        <label>Email</label>
        <input
          className={styles.inputBox}
          type="text"
          placeholder="Please enter your email"
          onChange={handleChange}
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
      <button
        className={`${styles.childBox} ${styles.signupButton}`}
        onClick={() => {
          signIn("email", { email: email })
        }}
      >
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
            <Image src="/facebook-white-logo.png" width="11" height="14" />
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
            <Image src="/google-white-logo.png" width="15" height="15" />
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
