import Layout from "src/components/UserProfileLayout"
import styles from "src/styles/pages/user/ManageStore.module.scss"
import ActivateSeller from "src/components/ActivateSeller"
import Store from "src/components/Store"
import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"
import { getSession } from "next-auth/react"

export default function ManageStore({ user }) {
  return (
    <div className={styles.container}>
      <Layout user={user}>
        {user.isSeller ? (
          <Store />
        ) : (
          <ActivateSeller
            userId={user._id}
            username={user.name}
            userEmail={user.email}
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
