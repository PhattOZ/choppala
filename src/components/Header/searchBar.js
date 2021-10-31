import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

export default function searchBar(props) {
  const router = useRouter()
  const [keyword, setKeyword] = useState("")
  const router = useRouter()

  const handleChange = (e) => {
    const value = e.target.value
    setKeyword(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    router.push({
      pathname: "/search",
      query: { keyword: keyword },
    })
  }

  return (
    <form className={props.className} onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        placeholder="search in Choppala"
      />
      <Link
        href={{
          pathname: "/filter",
          query: { ...router.query, keyword },
        }}
      >
        <a>
          <div>
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </a>
      </Link>
    </form>
  )
}
