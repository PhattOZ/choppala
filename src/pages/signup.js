import Image from "next/image"
// Styles
import styles from "../styles/pages/Signup.module.css"
// Components
import SignupBox from "../components/SignupBox"

export default function Signup() {
  return (
    <div className={styles.container}>
      <div className={styles.peopleIcon}>
        <Image src="/signup-people-icon.svg" layout="fill" objectFit="cover" />
      </div>
      <SignupBox />
    </div>
  )
}
