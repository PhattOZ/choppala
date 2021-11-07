// Next.js libraries
import Link from "next/link"
import { useRouter } from "next/router"
// Style
import styles from "./Pagination.module.scss"

export default function Pagination({ itemsPerPage, totalItems, paginate }) {
  const router = useRouter()
  const pageNumber = []
  const currentPage = router.query.page ? router.query.page : 1

  // Dymanic assign total number for pagination component
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumber.push(i)
  }

  return (
    <div className={styles.container}>
      {pageNumber.map((i) => {
        const blueStyle = i == currentPage ? styles.bluebg : null
        return (
          <Link
            key={i}
            href={{
              pathname: "/filter",
              query: { ...router.query, page: i },
            }}
          >
            <div className={`${styles.child} ${blueStyle}`}>{i}</div>
          </Link>
        )
      })}
    </div>
  )
}
