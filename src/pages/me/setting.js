import styles from "src/styles/pages/user/Setting.module.scss"
import { useState } from "react"
import { getSession } from "next-auth/react"
import Layout from "src/components/UserProfileLayout"
import Popup from "src/components/Popup"
import { deleteAccount } from "src/lib/modalContent"
import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"
import { useRouter } from "next/router"

export default function Setting({ user }) {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  //Open-Close Modal
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  //For remove from database
  const handleClick = async () => {
    const res = await fetch(`/api/user?userId=${user._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sellerId: user.sellerId,
      }),
    })
    if (res.ok) {
      router.push("/")
    }
  }

  return (
    <div className={styles.container}>
      <Layout user={user}>
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

export const getServerSideProps = async (context) => {
  const { req } = context
  const session = await getSession({ req })

  if (session) {
    await dbConnect()
    const leanResponse = await User.findOne(
      {
        name: session.user.name,
        email: session.user.email,
      },
      { name: 1, email: 1, image: 1, _id: 1, sellerId: 1 }
    ).lean()

    leanResponse._id = leanResponse._id.toString()

    return {
      props: {
        user: leanResponse,
      },
    }
  } else {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    }
  }
}
