import styles from "src/styles/pages/user/PurchaseHistory.module.scss"
import { useSession } from "next-auth/react"
import Layout from "src/components/UserProfileLayout"
import Loader from "src/components/Loader"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Popup from "src/components/Popup"
import { rating } from "src/lib/modalContent"

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
      .then((data) => {
        setItems(data)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }, [])

  // Loading session
  if (status === "loading" || loading == true) {
    return <Loader />
  }

  return (
    <div className={styles.container}>
      <Layout user={session.user}>
        <div className={styles.main}>
          {Items.slice(0)
            .reverse()
            .map((data) => (
              <EachItem
                item={data}
                key={data.itemID + data.orderAt}
                user={session.user}
              />
            ))}
        </div>
      </Layout>
    </div>
  )
}

const EachItem = ({ item, user }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [isRating, setIsRating] = useState(item.isRating)

  const onClickRating = () => {
    setShowPopup(true)
  }

  const reviewHandler = (val) => {
    const newReview = {
      userName: user.name,
      userImage: user.image,
      rating: val,
      id: item.itemID,
    }

    fetch("/api/review", {
      method: "POST",
      body: JSON.stringify(newReview),
      headers: {
        "content-type": "application/json",
      },
    })

    fetch("/api/userHistory", {
      method: "PUT",
      body: JSON.stringify(item.itemID),
      headers: {
        "content-type": "application/json",
      },
    })
    setIsRating(true)
  }

  const date = item.orderAt.match(/^\d{4}-\d{2}-\d{2}/g)[0]

  return (
    <div className={styles.eachOrder}>
      <div className={styles.eachOrder__head}>
        <Link href={`/seller/${item.sellerID}`}>
          <a>{item.sellerName}</a>
        </Link>

        <span>order at {date.split("-").reverse().join("-")}</span>
      </div>
      <div className={styles.eachOrder__item}>
        <div className={styles.eachOrder__image}>
          <Image
            src={item.image}
            layout="fill"
            objectFit="cover"
            alt="historyItem"
          />
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
        <div
          className={isRating ? styles.unRating : ""}
          onClick={isRating ? undefined : onClickRating}
        >
          Rating
        </div>
      </div>

      {showPopup && (
        <Popup
          show={showPopup}
          onClose={() => setShowPopup(false)}
          onClick={() => setShowPopup(true)}
          title={rating.title}
          titlecolor={rating.titlecolor}
          subtitle={rating.subtitle}
          icon={rating.icon}
          content1={rating.content1}
          content2={rating.content2}
          buttonShow={rating.buttonShow}
          onSubmit={reviewHandler}
        />
      )}
    </div>
  )
}
