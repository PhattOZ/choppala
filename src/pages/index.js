import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import Card from "src/components/Card"
import categories from "src/lib/categoryList"
import styles from "src/styles/pages/index.module.scss"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import useSWR from "swr"

function CategoryLink({ category }) {
  return (
    <Link href={{ pathname: "/filter", query: { category: category.name } }}>
      <a>
        <div className={styles.category}>
          <div className={styles.category_image}>
            <Image
              src={category.img}
              layout="fill"
              objectFit="contain"
              alt="category"
              priority
            />
          </div>
          <div className={styles.category_title}>{category.name}</div>
        </div>
      </a>
    </Link>
  )
}

const bannerImages = [
  "/banners/b-choppala.png",
  "/banners/b-blackfriday.png",
  "/banners/b-12.png",
  "/banners/b-electronics.png",
  "/banners/b-seller.png",
  "/banners/b-tech.png",
]

const autoplay = Autoplay({
  stopOnInteraction: false,
  stopOnMouseEnter: true,
})

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Index({ productList }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay])
  const { data, error } = useSWR("/api/index_item_list", fetcher)

  const itemCardsUI = () => {
    if (error) {
      return <div>Failed to load</div>
    }

    if (!data) {
      return <div>loading</div>
    }

    const items = data.items.map((item) => (
      <Card
        key={item.id}
        itemID={item.id}
        title={item.name}
        price={item.price}
        image={item.images[0]}
      />
    ))

    return items
  }

  return (
    <>
      <Head>
        <title>Choppala | Shop Chim & Chill</title>
        <meta
          name="description"
          content="Wonderously designed ecommerse application. Choppala is crafted carefully and delicately utilizing topics learned during Covid lockdown."
        />
        <meta
          name="google-site-verification"
          content="k4fkUPyXYXuPrtxq7AzZW0-FenIrO2xiktU4S6oXicY"
        />
      </Head>
      <div className={styles.container}>
        <div>
          <section className={styles.section}>
            <div className={styles.embla} ref={emblaRef}>
              <div className={styles.embla__container}>
                {bannerImages.map((src) => (
                  <div key={src} className={styles.embla__slide}>
                    <Image
                      src={src}
                      layout="fill"
                      objectFit="contain"
                      alt="banner"
                      priority
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.section_title}>Categories</div>
            <div
              className={styles.categoriesContainer}
              style={{ "--category-length": categories.length }}
            >
              {categories.map((category) => (
                <CategoryLink key={category.name} category={category} />
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.section_title}>Just for you</div>
            <div className={styles.cardContainer}>{itemCardsUI()}</div>
          </section>
        </div>
      </div>
    </>
  )
}

// export async function getServerSideProps() {
//   await dbConnect()
//   const items = await Item.find({}, { _id: 0 })
//     .sort({ _id: -1 })
//     .limit(18)
//     .lean()

//   return {
//     props: {
//       productList: items,
//     },
//   }
// }
