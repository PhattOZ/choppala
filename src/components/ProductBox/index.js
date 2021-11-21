import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as farfaHeart } from "@fortawesome/free-regular-svg-icons"
import {
  faStar,
  faTags,
  faCartPlus,
  faCoins,
  faHeart as fasfaHeart,
} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import styles from "./ProductBox.module.scss"

export default function ProductBox({
  onClickBuynow,
  onCartChange,
  productname,
  price,
  sellerName,
  sellerId,
  reviewCount,
  images,
}) {
  const [count, setCount] = useState(1)

  const [heart, setHeart] = useState(farfaHeart)

  const handleChangeHeart = () => {
    setHeart((previousHeart) => {
      return !previousHeart
    })
  }

  const handleClick = () => {
    setCount(count + 1)
  }
  const decreaseClick = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  const passCartToUppercompo = () => {
    onCartChange(count)
    setCount(1)
  }

  const passItemFromBuynow = () => {
    onClickBuynow(count)
    setCount(1)
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.imgcontainer}>
          <div>
            <Image
              src={images[0]}
              alt="Product image"
              width={288}
              height={288}
            />
          </div>
          <div className={styles.imggal}>
            {images.map((image, index) => {
              if (index !== 0) {
                return (
                  <Image
                    src={image}
                    alt="Product image"
                    width={64}
                    height={64}
                    key={index}
                  />
                )
              }
            })}
          </div>
        </div>
        <div className={styles.infocontainer}>
          <div className={styles.top}>
            <div>
              <div className={styles.title}>{productname}</div>
            </div>

            {/* <div className={styles.break}></div> */}
            <div className={styles.heartbox}>
              <div className={styles.wishlist}>
                {heart ? (
                  <FontAwesomeIcon
                    icon={farfaHeart}
                    onClick={handleChangeHeart}
                    size={"lg"}
                    color="#8B8EA1"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={fasfaHeart}
                    onClick={handleChangeHeart}
                    size={"lg"}
                    color="#8B8EA1"
                  />
                )}
                <div className={styles.txtwish}>wishlist</div>
              </div>
            </div>
          </div>
          <div className={styles.infosec}>
            <div className={styles.fsold}>
              <div className={styles.p1}>
                Sold by{" "}
                <Link href={`/seller/${sellerId}`}>
                  <a className={styles.soldname}>{sellerName}</a>
                </Link>
              </div>
            </div>
            <div className={styles.freview}>
              <div className={styles.stars}>
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#A8AABC" />
              </div>
              <div className={styles.p2}>{reviewCount} reviews</div>
            </div>
          </div>
          <div className={styles.pricecontainer}>
            <div className={styles.price}>
              <FontAwesomeIcon icon={faCoins} size={"xs"} color="#FFD44D" />
              {` ${price}`}
            </div>
          </div>
          <div className={styles.linehr}></div>
          <div className={styles.countcontainer}>
            <div className={styles.p1}>Quantity</div>
            <div className={styles.break}></div>
            <button className={styles.btncountdec} onClick={decreaseClick}>
              -
            </button>
            <div className={styles.qcount}>{count}</div>
            <button className={styles.btncountadd} onClick={handleClick}>
              +
            </button>
          </div>
          <div className={styles.btncontainer}>
            <div className={styles.btncart} onClick={passCartToUppercompo}>
              <div className={styles.icon}>
                <FontAwesomeIcon icon={faCartPlus} size={"lg"} />
              </div>
              <div>Add to cart</div>
            </div>
            <div className={styles.btnbuy} onClick={passItemFromBuynow}>
              <div className={styles.icon}>
                <FontAwesomeIcon icon={faTags} size={"lg"} />
              </div>
              <div>Buy now</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
