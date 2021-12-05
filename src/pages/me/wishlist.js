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
        <div className={styles.main}>
          <div className={styles.card_container}>
            {data.map((wishlist) => (
              <Card
                title={wishlist.name}
                price={wishlist.price}
                image={wishlist.image}
                key={wishlist.id}
                itemID={wishlist.id}
                avg_rating={wishlist.avg_rating}
              />
            ))}
          </div>
        </div>
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
      " -_id name email image wishlist"
    )

    const items = await Item.aggregate([
      { $match: { id: { $in: Response.wishlist } } },
      {
        $project: {
          _id: 0,
          id: 1,
          name: 1,
          price: 1,
          image: { $arrayElemAt: ["$images", 0] },
          reviews: 1,
          avg_rating: { $round: [{ $avg: "$reviews.rating" }, 1] },
        },
      },
      { $sort: { _id: -1 } },
    ])

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
