import styles from "./Store.module.scss"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"

export default function Store() {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signup")
    },
  })

  return (
    <>
      <div className={styles.main}>
        <section>
          <div className={styles.header}>Store Information</div>
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
              <label htmlFor="">Store Name</label>
              <input type="text" size="35"/>
            </div>
            <div className={styles.edit_section}>
              <label htmlFor="">Store Email</label>
              <input type="text" size="50"/>
            </div>
          </div>
          <div className={styles.button_wrapper}>
            <div className={styles.saveButton}>Save</div>
          </div>
        </section>

        <div className={styles.dashboard}>
          <div className={styles.peopleIcon}>
            <Image src="/dashboard.svg" layout="fill" objectFit="cover" />
          </div>
          <div className={styles.text}>Dashboard is coming soon</div>
        </div>
      </div>
    </>
  )
}
