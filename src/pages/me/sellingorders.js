import Layout from "src/components/UserProfileLayout"
import styles from "src/styles/pages/user/SellingOrders.module.scss"
import ActivateSeller from "src/components/ActivateSeller"
import { getSession } from "next-auth/react"
import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"
import YourProductBox from "src/components/YourProductBox"

export default function SellingOrders({ user }) {
  return (
    <div className={styles.container}>
      <Layout user={user}>
        {user.isSeller ? (
          <YourProductBox sellerId={user.sellerId} isSeller={user.isSeller} />
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
      { name: 1, email: 1, image: 1, isSeller: 1, sellerId: 1 }
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
