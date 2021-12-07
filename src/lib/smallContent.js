import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faHeart } from "@fortawesome/free-solid-svg-icons"

const addCart = {
  title: "Added to cart",
  icon: <FontAwesomeIcon icon={faCheckCircle} size="2x" color="#fff" />,
}

const wishlist = {
  title: "Added to wishlist",
  icon: <FontAwesomeIcon icon={faHeart} size="2x" color="#fff" />,
}
export { addCart, wishlist }
