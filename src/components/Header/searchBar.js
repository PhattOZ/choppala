import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import styles from "./header.module.scss"
import { forwardRef } from "react"

export default function SearchBar() {
  const router = useRouter()
  const [keyword, setKeyword] = useState("")
  const [dropdown, setDropdown] = useState(false)
  const [items, setItems] = useState([])
  const childRef = useRef()

  const handleChange = (e) => {
    //handle every keystrokes
    const value = e.target.value
    setKeyword(value)
    if (value.length > 1) {
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
    //handle when press enter
    event.preventDefault()
    router.push({
      pathname: "/filter",
      query: { ...router.query, keyword },
    })
    setKeyword("")
    setDropdown(false)
  }

  useEffect(() => {
    //handle close search result when click outside search dropdown
    const checkIfClickedOutside = (e) => {
      // If the search dropdown is open and the clicked target is not within the search dropdown,
      // then close the search dropdown
      if (
        dropdown &&
        childRef.current &&
        !childRef.current.contains(e.target)
      ) {
        setDropdown(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [dropdown])

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
        <ItemList Items={items} setDropdown={setDropdown} ref={childRef} />
      )}
    </div>
  )
}

const ItemList = forwardRef(function ItemList(props, ref) {
  return (
    <ul
      className={styles.search__dropdown}
      onClick={() => {
        props.setDropdown(false)
      }}
      ref={ref}
    >
      {props.Items.length > 0 ? (
        props.Items.map((item) => <Item props={item} key={item.id} />)
      ) : (
        <div className={styles.search_item__empty}>not found</div>
      )}
    </ul>
  )
})

const Item = ({ props }) => {
  return (
    <Link href={`/product/${props.id}`} key={props.id}>
      <a>
        <li className={styles.search_item}>
          <div className={styles.search_item__image}>
            <Image
              src={props.image}
              layout="fill"
              objectFit="cover"
              alt="item"
            />
          </div>
          <span>{props.name}</span>
        </li>
      </a>
    </Link>
  )
}
