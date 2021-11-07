import { useState } from "react"

export const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1)

  // Paginate function (Used for change page by Pagination component)
  const paginate = (pagenum) => {
    setCurrentPage(pagenum)
  }

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  return { currentPage, currentItems, paginate }
}
