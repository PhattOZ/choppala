import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as farfaHeart } from "@fortawesome/free-regular-svg-icons"
import {
  faStar,
  faTags,
  faCartPlus,
  faHeart as fasfaHeart,
} from "@fortawesome/free-solid-svg-icons"
import { useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import styles from "./ProductBox.module.scss"
import useEmblaCarousel from "embla-carousel-react"

export default function ProductBox({
  onClickBuynow,
  onCartChange,
  productname,
  price,
  sellerName,
  sellerId,
  review_count,
  avg_rating,
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
        <ImageSlide images={images} />
        <div className={styles.infocontainer}>
          <div className={styles.top}>
            <div>
              <div className={styles.title}>{productname}</div>
            </div>

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
            <div className={styles.rating}>
              {avg_rating ? (
                <>
                  <div className={styles.average_rating}>
                    {avg_rating.toFixed(1)}
                  </div>
                  <span style={{ "--rating": avg_rating }} />
                  <div> {`${review_count} reviews`}</div>
                </>
              ) : (
                <div>No review</div>
              )}
            </div>
          </div>
          <div className={styles.pricecontainer}>
            <div className={styles.price}>{`฿${price}`}</div>
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

const ImageSlide = ({ images }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0)

  const changeMainImageHandler = (e) => {
    setMainImageIndex(e.currentTarget.getAttribute("imageat"))
  }

  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
    align: "start",
    loop: true,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  let ImageCarosel
  if (images.length > 4) {
    ImageCarosel = (
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          {images.map((image, index) => {
            return (
              <div
                className={`${styles.embla__slide} ${
                  index == mainImageIndex && styles.item_image_select
                }`}
                key={index}
                onClick={changeMainImageHandler}
                imageat={index}
              >
                <Image src={image} alt="Product image" layout="fill" />
              </div>
            )
          })}
        </div>
        <button
          className={styles.embla__bottonPrev}
          type="button"
          onClick={scrollPrev}
        >
          <span></span>
        </button>
        <button
          className={styles.embla__bottonNext}
          type="button"
          onClick={scrollNext}
        >
          <span></span>
        </button>
      </div>
    )
  } else if (images.length > 1) {
    ImageCarosel = (
      <div className={styles.imggal}>
        {images.map((image, index) => {
          return (
            <div
              className={`${styles.item_image} ${
                index == mainImageIndex && styles.item_image_select
              }`}
              key={index}
              onClick={changeMainImageHandler}
              imageat={index}
            >
              <Image src={image} alt="Product image" layout="fill" />
            </div>
          )
        })}
      </div>
    )
  } else {
    ImageCarosel = <></>
  }

  return (
    <div className={styles.imgcontainer}>
      <MainImage index={mainImageIndex} images={images} />
      {ImageCarosel}
    </div>
  )
}

const MainImage = ({ images, index }) => {
  const [imagePos, setImagePos] = useState({
    backgroundPosition: "0% 0%",
  })

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.pageX - left) / width) * 100
    const y = ((e.pageY - top) / height) * 100
    setImagePos({ backgroundPosition: `${x}% ${y}%` })
  }

  const mainImage_style = {
    backgroundPosition: imagePos.backgroundPosition,
    backgroundImage: `url(${images[index]})`,
  }

  return (
    <div
      className={styles.item_mainImage}
      onMouseMove={handleMouseMove}
      style={mainImage_style}
    >
      <Image src={images[index]} alt="Product image" layout="fill" />
    </div>
  )
}
