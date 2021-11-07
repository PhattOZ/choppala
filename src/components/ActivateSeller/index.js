import Image from "next/image"
import styles from "./ActivateSeller.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCheck } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"

export default function ActivateSeller({ name, email }) {
  const router = useRouter()
  const data = { name, email }
  async function setSeller() {
    const res = await fetch("/api/setSeller", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      router.reload()
    }
  }

  return (
    <>
      <div className={styles.main}>
        <section>
          <div className={styles.peopleIcon}>
            <Image
              src="/activate-seller.svg"
              layout="fill"
              objectFit="cover"
              alt="active seller icon"
            />
          </div>
          <div className={styles.text}>Start selling on Choppala</div>
          <div className={styles.button} onClick={setSeller}>
            <FontAwesomeIcon icon={faUserCheck} size={"lg"} />
            Activate seller
          </div>
        </section>
      </div>
    </>
  )
}
