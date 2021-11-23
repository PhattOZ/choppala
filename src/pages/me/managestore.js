import Layout from "src/components/UserProfileLayout"
import styles from "src/styles/pages/user/ManageStore.module.scss"
import ActivateSeller from "src/components/ActivateSeller"
import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"
import { getSession } from "next-auth/react"
import Image from "next/image"

function Store({ user }) {
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
              <input type="text" size="30" />
            </div>
            <div className={styles.edit_section}>
              <label htmlFor="">Store Email</label>
              <input type="text" size="30" />
            </div>
          </div>
          <div className={styles.button_wrapper}>
            <div className={styles.saveButton}>Save</div>
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
