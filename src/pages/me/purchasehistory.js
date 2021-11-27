import styles from "src/styles/pages/user/PurchaseHistory.module.scss"
import { useSession } from "next-auth/react"
import Layout from "src/components/UserProfileLayout"
import Loader from "src/components/Loader"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Purchasehistory() {
  const router = useRouter()
  const [Items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signup")
    },
  })

  useEffect(() => {
    fetch("/api/userHistory")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch(setLoading(false))
  }, [])

  // Loading session
  if (status === "loading" || loading == true) {
    return <Loader />
  }

  return (
    <div className={styles.container}>
      <Layout user={session.user}>
        <div className={styles.main}>
          {Items.map((data) => (
            <EachItem item={data} key={data._id} />
          ))}
        </div>
      </Layout>
    </div>
  )
}

const EachItem = ({ item }) => {
  return (
    <div className={styles.eachOrder}>
      <div className={styles.eachOrder__head}>
        <span>{item.sellerName}</span>
        <span>seller will be</span>
      </div>
      <div className={styles.eachOrder__item}>
        <div className={styles.eachOrder__image}>
          <Image src={item.image} layout="fill" objectFit="cover" alt="" />
        </div>
        <div>{item.name}</div>
        <div>x{item.quantity}</div>
        <div>฿{item.price}</div>
      </div>
      <div>
        Total order amount <span>฿{item.quantity * item.price}</span>
      </div>
      <div className={styles.eachOrder__botton}>
        <div>
          <Link href={`/product/${item.itemID}`}>
            <a>
              <div>Buy Again</div>
            </a>
          </Link>
        </div>
        <div className={item.isRating ? styles.unRating : ""}>Rating</div>
      </div>
    </div>
  )
}
