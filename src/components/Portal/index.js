import { useRef, useEffect, useState } from "react"
import { createPortal } from "react-dom"

export default function ClientOnlyPortal({ children, selector }) {
  const ref = useRef()
  const [mount, setMount] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMount(true)
    return () => {
      setMount(false)
    }
  }, [selector])

  return mount ? createPortal(children, ref.current) : null
}
