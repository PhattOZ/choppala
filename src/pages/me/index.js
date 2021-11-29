import styles from "src/styles/pages/user/Profile.module.scss"
//Component
import Layout from "src/components/UserProfileLayout"
//Lib
import Image from "next/image"
import { getSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/router"
//Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"
// Database
import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"
// Modal
import { success } from "src/lib/modalContent"
import Popup from "src/components/Popup"

export default function Profile({ user }) {
  const router = useRouter()
  // ----------------------- Input state -----------------------
  const [userInput, setUserInput] = useState({
    username: user.name,
    email: user.email,
    customName: user.customName ? user.customName : "",
    phoneNumber: user.phoneNumber ? user.phoneNumber : "",
  })
  const [addressInput, setAddressInput] = useState({
    address: user.address ? user.address : "",
    addressName: user.customName ? user.customName : "",
    addressPhone: user.phoneNumber ? user.phoneNumber : "",
  })
  // ------------------------------------------------------------

  const [successModal, setSuccessModal] = useState(false) // Success modal state

  const handleUserChange = (e) => {
    const { name, value } = e.target
    setUserInput({ ...userInput, [name]: value })
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setAddressInput({ ...addressInput, [name]: value })
  }

  const handleSubmit = async () => {
    const res = await fetch(`/api/user?userId=${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userInput,
      }),
    })
    if (res.ok) {
      setSuccessModal(true)
    }
  }

  const handleAddressSubmit = async () => {
    const res = await fetch(`/api/user?userId=${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customName: addressInput.addressName,
        phoneNumber: addressInput.addressPhone,
        address: addressInput.address,
      }),
    })
    if (res.ok) {
      setSuccessModal(true)
    }
  }

  return (
    <div className={styles.container}>
      <Layout user={user}>
        <div className={styles.main}>
          <section>
            <div className={styles.header}>General Information</div>
            <div className={styles.edit}>
              <div className={styles.edit_section}>
                <div className={styles.user_img}>
                  <Image
                    src={user.image}
                    layout="fill"
                    objectFit="cover"
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className={styles.edit_section}>
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  name="username"
                  value={userInput.username}
                  readOnly
                />
                <label htmlFor="">Phone number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={userInput.phoneNumber}
                  onChange={handleUserChange}
                />
              </div>
              <div className={styles.edit_section}>
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  name="customName"
                  value={userInput.customName}
                  onChange={handleUserChange}
                />
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name="email"
                  value={userInput.email}
                  readOnly
                />
              </div>
            </div>
            <div className={styles.button_wrapper}>
              <div className={styles.saveButton} onClick={handleSubmit}>
                Save
              </div>
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
                  <input
                    type="text"
                    name="addressName"
                    value={addressInput.addressName}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className={styles.edit_section}>
                  <label htmlFor="">Phone number</label>
                  <input
                    type="text"
                    name="addressPhone"
                    value={addressInput.addressPhone}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>
              <div className={styles.edit_t}>
                <div className={styles.edit_text}>
                  <label htmlFor="">Address</label>
                  <textarea
                    id="address"
                    rows="4"
                    name="address"
                    value={addressInput.address}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>
              <div className={styles.button_wrapper}>
                <div
                  className={styles.saveButton}
                  onClick={handleAddressSubmit}
                >
                  Save
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
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
      { name: 1, email: 1, image: 1, customName: 1, address: 1, phoneNumber: 1 }
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
