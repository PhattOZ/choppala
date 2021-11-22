import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import { useState } from "react"
import Link from "next/link"
import styles from "./header.module.scss"

export default function SearchBar() {
  const router = useRouter()
  const [keyword, setKeyword] = useState("")
  const [dropdown, setDropdown] = useState(false)
  const [items, setItems] = useState([])

  const handleChange = (e) => {
    const value = e.target.value
    setKeyword(value)
    if (value.length > 0) {
      setDropdown(true)
      fetch("/api/searchItem", {
        method: "POST",
        body: JSON.stringify(value),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setItems(data))
    } else {
      setDropdown(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    router.push({
      pathname: "/filter",
      query: { ...router.query, keyword },
    })
    setKeyword("")
    setDropdown(false)
  }

  const searchDropdownHandler = (e) => {
    const value = e.target.value
    value.length > 0 ? setDropdown(true) : setDropdown(false)
  }

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="search in Choppala"
          value={keyword}
          onClick={searchDropdownHandler}
          onBlur={() => {
            setDropdown(false)
          }}
        />
        <div>
          <Link
            href={{
              pathname: "/filter",
              query: { ...router.query, keyword },
            }}
          >
            <a>
              <div>
                <FontAwesomeIcon icon={faSearch} size={"lg"} />
              </div>
            </a>
          </Link>
        </div>
      </form>
      {dropdown && (
        <ul className={styles.search__dropdown}>
          <li>item1</li>
          <li>item2</li>
        </ul>
      )}
    </div>
  )
}
