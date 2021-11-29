import styles from "src/styles/pages/user/Setting.module.scss"
import { useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import Layout from "src/components/UserProfileLayout"
import Popup from "src/components/Popup"
import { deleteAccount } from "src/lib/modalContent"

export default function Setting() {
  const [showModal, setShowModal] = useState(false)
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

  //Open-Close Modal
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)
  

  //For remove from database
  const handleClick = () => console.log("click")

  return (
    <div className={styles.container}>
      <Layout user={session.user}>
        <div className={styles.main}>
          <section>
            <div className={styles.title}>Delete Account</div>
            <div className={styles.textbox}>
              <div className={styles.textinfo}>
                <p>
                  Account deletion is permanent and irreversible. After
                  successful deletion, you will no longer be able to log in to a
                  deleted account and view previous account history. Choppala
                  reserves the right to reject future account creation request
                  from you.
                </p>
              </div>
            </div>
            <div className={styles.button_wrapper}>
              <div className={styles.deleteBtn} onClick={handleShow}>
                Delete
              </div>
            </div>
          </section>
        </div>
      </Layout>
      {/* -----------Popup------------ */}
      {showModal && (
        <Popup
          show={showModal}
          onClose={handleClose}
          onClick={handleClick}
          title={deleteAccount.title}
          titlecolor={deleteAccount.titlecolor}
          subtitle={deleteAccount.subtitle}
          icon={deleteAccount.icon}
          content1={deleteAccount.content1}
          content2={deleteAccount.content2}
          buttonShow={deleteAccount.buttonShow}
        />
      )}
    </div>
  )
}
