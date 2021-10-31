import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import { useState } from "react"
import Link from "next/link"

export default function searchBar(props) {
  const router = useRouter()
  const [keyword, setKeyword] = useState("")

  const handleChange = (e) => {
    const value = e.target.value
    setKeyword(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    router.push({
      pathname: "/filter",
      query: { ...router.query, keyword },
    })
  }

  return (
    <form className={props.className} onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        placeholder="search in Choppala"
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
  )
}
