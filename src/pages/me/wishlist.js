import Layout from "src/components/UserProfileLayout"
import styles from "src/styles/pages/user/Wishlist.module.scss"
import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"
import { getSession } from "next-auth/react"
import Item from "src/models/Item"
import Card from "src/components/Card"

export default function Wishlist({ data, user }) {
  return (
    <div className={styles.container}>
      <Layout user={user}>
        {data.map((wishlist) => (
          <Card
            title={wishlist.name}
            price={wishlist.price}
            image={wishlist.images[0]}
            key={wishlist.id}
            itemID={wishlist.id}
          />
        ))}
      </Layout>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const { req } = context
  const session = await getSession({ req })

  if (session) {
    await dbConnect()
    const Response = await User.findOne(
      {
        name: session.user.name,
        email: session.user.email,
      },
      " -_id"
    )

    let items = await Item.find({
      _id: {
        $in: Response.wishlist,
      },
    }).lean()

    items.map((item) => {
      item._id = item._id.toString()
    })

    return {
      props: {
        user: JSON.parse(JSON.stringify(Response)),
        data: items,
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
