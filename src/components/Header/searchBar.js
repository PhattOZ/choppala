import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import Link from "next/link"

export default function searchBar(props) {
  const [keyword, setKeyword] = useState("")

  const handleChange = (e) => {
    const value = e.target.value

    setKeyword(value)
  }

  return (
    <form className={props.className}>
      <input
        type="text"
        onChange={handleChange}
        placeholder="search in Choppala"
      />

      <Link href={{ pathname: "/search", query: { keyword: keyword } }}>
        <a>
          <div>
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </a>
      </Link>
    </form>
  )
}
