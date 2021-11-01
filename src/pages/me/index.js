import styles from "src/styles/pages/user/Profile.module.scss"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Layout from "src/components/UserProfileLayout"
import { useRouter } from "next/router"

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
    return <h1>Loading...</h1>
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
                  />
                </div>
              </div>
              <div className={styles.edit_section}>
                <label htmlFor="">Username</label>
                <input type="text" />
                <label htmlFor="">Phone</label>
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
        </div>
      </Layout>
    </div>
  )
}
