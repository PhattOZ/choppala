import Layout from "src/components/UserProfileLayout"
import styles from "src/styles/pages/user/ManageStore.module.scss"
import ActivateSeller from "src/components/ActivateSeller"
import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"
import { getSession } from "next-auth/react"
import Image from "next/image"
import { useState, useEffect } from "react"
import Popup from "src/components/Popup"
import { success } from "src/lib/modalContent"
import { useRouter } from "next/router"

function Store({ user }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true) // Show loading text if this page not fetch seller data yet
  const [successModal, setSuccessModal] = useState(false) // Success modal state
  const [sellerInput, setSellerInput] = useState({
    storeName: "",
    storeEmail: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSellerInput({ ...sellerInput, [name]: value })
  }

  const handleSubmit = async () => {
    const res = await fetch(`/api/seller?userId=${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...sellerInput,
      }),
    })
    if (res.ok) {
      setSuccessModal(true)
    }
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/seller?userId=${user._id}`)
      const resData = await res.json()
      setSellerInput({
        storeName: resData.storeName,
        storeEmail: resData.storeEmail,
      })
      setLoading(false)
    }
    fetchData()
  }, [user._id])

  if (loading) {
    return <></>
  }

  return (
    <>
      <div className={styles.main}>
        <section>
          <div className={styles.header}>Store Information</div>
          <div className={styles.edit}>
            <div className={styles.edit_section}>
              <div className={styles.user_img}>
                <Image
                  src={user.image}
                  layout="fill"
                  objectFit="cover"
                  alt="user"
                />
              </div>
            </div>
            <div className={styles.edit_section}>
              <label htmlFor="">Store Name</label>
              <input
                type="text"
                size="30"
                name="storeName"
                value={sellerInput.storeName}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.edit_section}>
              <label htmlFor="">Store Email</label>
              <input
                type="text"
                size="30"
                name="storeEmail"
                value={sellerInput.storeEmail}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.button_wrapper}>
            <div className={styles.saveButton} onClick={handleSubmit}>
              Save
            </div>
          </div>
        </section>

        <div className={styles.dashboard}>
          <div className={styles.peopleIcon}>
            <Image
              src="/dashboard.svg"
              alt="dashboard"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.text}>Dashboard is coming soon</div>
        </div>
      </div>
      {/* -----------Popup------------ */}
      {successModal && (
        <Popup
          show={successModal}
          onClose={() => {
            router.reload()
          }}
          onClick={() => setSuccessModal((prev) => !prev)}
          title={success.title}
          titlecolor={success.titlecolor}
          subtitle={success.subtitle}
          icon={success.icon}
          content1={success.content1}
          content2={success.content2}
          buttonShow={success.buttonShow}
        />
      )}
    </>
  )
}

export default function ManageStore({ user }) {
  return (
    <div className={styles.container}>
      <Layout user={user}>
        {user.isSeller ? (
          <Store user={user} />
        ) : (
          <ActivateSeller
            userId={user._id}
            username={user.name}
            userEmail={user.email}
            userImage={user.image}
          />
        )}
      </Layout>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })

  if (session) {
    await dbConnect()
    const leanResponse = await User.findOne(
      {
        name: session.user.name,
        email: session.user.email,
      },
      { name: 1, email: 1, image: 1, isSeller: 1 }
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
