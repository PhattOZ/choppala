import styles from "src/styles/pages/user/Profile.module.scss"
//Component
import Layout from "src/components/UserProfileLayout"
import Loader from "src/components/Loader"
//Lib
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
//Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"

export default function Profile() {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signup")
    },
  })

  // Loading session
  if (status === "loading") {
    return <Loader />
  }

  return (
    <div className={styles.container}>
      <Layout user={session.user}>
        <div className={styles.main}>
          <section>
            <div className={styles.header}>General Information</div>
            <div className={styles.edit}>
              <div className={styles.edit_section}>
                <div className={styles.user_img}>
                  <Image
                    src={session.user.image}
                    layout="fill"
                    objectFit="cover"
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className={styles.edit_section}>
                <label htmlFor="">Username</label>
                <input type="text" />
                <label htmlFor="">Phone number</label>
                <input type="text" />
                <label htmlFor="">Date</label>
                <input type="date" />
              </div>
              <div className={styles.edit_section}>
                <label htmlFor="">Name</label>
                <input type="text" />
                <label htmlFor="">Email</label>
                <input type="text" />
              </div>
            </div>
            <div className={styles.button_wrapper}>
              <div className={styles.saveButton}>Save</div>
            </div>
          </section>

          <section>
            <div className={styles.header}>Delivery Address</div>
            <div className={styles.del}>
              <div className={styles.edit}>
                <div className={styles.edit_section}>
                  <div className={styles.home_icon}>
                    <FontAwesomeIcon icon={faHome} size="2x" color="#4585ff" />
                  </div>
                </div>
                <div className={styles.edit_section}>
                  <label htmlFor="">Name</label>
                  <input type="text" />
                </div>
                <div className={styles.edit_section}>
                  <label htmlFor="">Phone number</label>
                  <input type="text" />
                </div>
              </div>
              <div className={styles.edit_t}>
                <div className={styles.edit_text}>
                  <label htmlFor="">Address</label>
                  <textarea id="address" rows="4" required />
                </div>
              </div>
              <div className={styles.button_wrapper}>
                <div className={styles.saveButton}>Save</div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </div>
  )
}
