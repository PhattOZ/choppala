// Next.js Libraries
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
// Styles
import styles from "src/styles/pages/Filter.module.scss"
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
// Components
import CategoryBox from "src/components/CategoryBox"
import Card from "src/components/Card"
import Pagination from "src/components/Pagination"
// Custom lib
import sortTitles from "src/lib/sortTitles"
import querySearch from "src/lib/querySearch"
import spliceData from "src/lib/spliceData"

const itemsPerPage = 20 // Number of Card per page (for pagination)

function Dropdown({ sort }) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <div>
      <div className={styles.dropdownBox} onClick={() => handleOpen()}>
        {sort}
        <FontAwesomeIcon icon={faCaretDown} size="lg" color="#7C7C7C" />
      </div>
      {open ? (
        <MenuLists lists={sortTitles} handleOpen={handleOpen} sort={sort} />
      ) : null}
    </div>
  )
}

function MenuLists({ lists, handleOpen, sort }) {
  const router = useRouter()
  return (
    <div className={styles.listsContainer}>
      {lists.map((i) => {
        const sortStyle = i === sort ? styles.fontBlue : null
        return (
          <Link
            key={i}
            href={{
              pathname: "/filter",
              query: { ...router.query, sort: i },
            }}
          >
            <a
              className={`${styles.dropdownItem} ${sortStyle}`}
              onClick={() => handleOpen()}
            >
              {i}
            </a>
          </Link>
        )
      })}
    </div>
  )
}

export default function Filter({
  keyword,
  category,
  currentItems,
  sortby,
  totalItems,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {keyword ? (
          <div className={styles.blue}>
            Search result for <span className={styles.keyword}>{keyword}</span>
          </div>
        ) : (
          <div></div>
        )}
        <div className={styles.header_sort}>
          <div className={styles.sortBy}>Sort by :</div>
          <Dropdown sort={sortby} />
        </div>
      </div>
      <div className={styles.main}>
        <CategoryBox />
        <div className={styles.main_body}>
          <div className={styles.card_container}>
            {currentItems &&
              currentItems.map((item) => (
                <Link key={item._id} href={`/product/${item._id}`}>
                  <a>
                    <Card
                      title={item.name}
                      price={item.price}
                      image={item.image}
                    />
                  </a>
                </Link>
              ))}
          </div>
          <div className={styles.page_container}>
            <Pagination itemsPerPage={itemsPerPage} totalItems={totalItems} />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const keyword = context.query.keyword ? context.query.keyword : ""
  const category = context.query.category ? context.query.category : ""
  const minprice = context.query.minprice ? context.query.minprice : ""
  const maxprice = context.query.maxprice ? context.query.maxprice : ""
  const sortby = context.query.sort ? context.query.sort : "Latest"
  const data = await querySearch(keyword, category, minprice, maxprice, sortby)

  // Paginate session
  const page = context.query.page ? context.query.page : "1"
  const currentItems = spliceData(data, page, itemsPerPage)
  const totalItems = data.length

  return {
    props: {
      keyword,
      category,
      currentItems,
      sortby,
      totalItems,
    },
  }
}
