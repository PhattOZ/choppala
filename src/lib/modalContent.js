import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCheckCircle,
  faTrashAlt,
  faTimesCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons"

//======================= User Popup ================================
const deleteAccount = {
  title: "Delete Account",
  titlecolor: "#ff1f00",
  icon: <FontAwesomeIcon icon={faTrashAlt} size="7x" color="#444655" />,
  subtitle: "Your account will be deleted!",
  content1: "Do you really want to delete account?",
  content2: "All information will permanently lost.",
  buttonShow: "delete",
}

const success = {
  title: "Success!",
  titlecolor: "#4585ff",
  icon: <FontAwesomeIcon icon={faCheckCircle} size="7x" color="#4585ff" />,
  subtitle: "Information updated",
  content1: "Your update is successfully done.",
  content2: null,
  buttonShow: false,
}

const error = {
  title: "Error!",
  titlecolor: "#ff1f00",
  icon: <FontAwesomeIcon icon={faTimesCircle} size="7x" color="#ff1f00" />,
  subtitle: "Update failed",
  content1: "Something went wrong. Please try again.",
  content2: null,
  buttonShow: false,
}

const warn = {
  title: "Warning!",
  titlecolor: "#444655",
  icon: (
    <FontAwesomeIcon icon={faExclamationTriangle} size="7x" color="#FFD44D" />
  ),
  subtitle: "Unsaved Changes",
  content1: "Do you really want to leave without saving?",
  content2: "All changes will be lost.",
  buttonShow: "warn",
}

//======================= Product Popup ================================
const deleteProduct = {
  title: "Delete Product",
  titlecolor: "#ff1f00",
  icon: <FontAwesomeIcon icon={faTrashAlt} size="7x" color="#444655" />,
  subtitle: "This product will be deleted!",
  content1: "Do you really want to delete this product?",
  content2: "All product information will be removed.",
  buttonShow: "delete",
}

const productSuccess = {
  title: "Success!",
  titlecolor: "#4585ff",
  icon: <FontAwesomeIcon icon={faCheckCircle} size="7x" color="#4585ff" />,
  subtitle: "Product added",
  content1: "The new product is successfully added.",
  content2: null,
  buttonShow: false,
}

const productError = {
  title: "Error!",
  titlecolor: "#ff1f00",
  icon: <FontAwesomeIcon icon={faTimesCircle} size="7x" color="#ff1f00" />,
  subtitle: "Failed to add product",
  content1: "Something went wrong. Please try again.",
  content2: null,
  buttonShow: false,
}

const productWarn = {
  title: "Warning!",
  titlecolor: "#444655",
  icon: (
    <FontAwesomeIcon icon={faExclamationTriangle} size="7x" color="#FFD44D" />
  ),
  subtitle: "Product has not been added",
  content1: "Do you really want to cancel?",
  content2: "All product information will be lost.",
  buttonShow: "warn",
}

//======================= Order Popup ================================
const orderReceived = {
  title: "Order Received",
  titlecolor: "#4585ff",
  icon: (
    <Image
      src="/order-received.svg"
      objectFit="cover"
      alt="order"
      width={156}
      height={156}
    />
  ),
  subtitle: "Thanks for your purchase!",
  content1: "Your order has been approved.",
  content2: "You can wait for shipping from seller.",
  buttonShow: "order",
}

//======================= Rating Popup ================================
const rating = {
  title: "Review & Rating",
  titlecolor: "#444655",
  icon: (
    <Image
      src="/rating.svg"
      objectFit="cover"
      alt="rate"
      width={156}
      height={156}
    />
  ),
  subtitle: "Thanks for your purchase!",
  content1: "Your order has been approved.",
  content2: "You can wait for shipping from seller.",
  buttonShow: "order",
}

export {
  deleteAccount,
  success,
  error,
  warn,
  deleteProduct,
  productSuccess,
  productError,
  productWarn,
  orderReceived,
  rating,
}
