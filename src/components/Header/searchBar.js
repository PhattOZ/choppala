export default function searchBar(props) {
  return (
    <form className={props.className}>
      <input type="text" placeholder="search in Choppala" />
      <button type="submit">
        <img src="/Search.png" alt="" />
      </button>
    </form>
  )
}
