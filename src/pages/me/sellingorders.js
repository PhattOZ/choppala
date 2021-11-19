import Layout from "src/components/UserProfileLayout"
import styles from "src/styles/pages/user/SellingOrders.module.scss"
import ActivateSeller from "src/components/ActivateSeller"
import YourProduct from "src/components/YourProductBox"
import { getSession } from "next-auth/react"
import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"
import Seller from "src/models/Seller"
import Item from "src/models/Item"
import YourProductBox from "src/components/YourProductBox"

export default function SellingOrders({ user, sellerItems }) {
  return (
    <div className={styles.container}>
      <Layout user={user}>
        {user.isSeller ? (
          <YourProductBox sellerItems={sellerItems} />
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
    const leanResponse = await User.findOne({
      name: session.user.name,
      email: session.user.email,
    }).lean()

    leanResponse._id = leanResponse._id.toString()

    const sellerLeanResponse = await Seller.findOne(
      { userId: leanResponse._id },
      { _id: 0 }
    ).lean()

    const sellerItems = await Item.find(
      { sellerId: sellerLeanResponse.id },
      { _id: 0 }
    ).lean()

    return {
      props: {
        user: leanResponse,
        sellerItems,
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
