import Image from "next/image"
// Styles
import styles from "src/styles/pages/Signup.module.scss"
// Components
import SignupBox from "../components/SignupBox"

export default function Signup() {
  return (
    <div className={styles.container}>
      <div className={styles.peopleIcon}>
        <Image
          src="/signup-people-icon.svg"
          layout="fill"
          objectFit="cover"
          alt="bg-img"
        />
      </div>
      <SignupBox />
    </div>
  )
}
