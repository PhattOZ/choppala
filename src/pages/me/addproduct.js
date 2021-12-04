// Styles
import Layout from "src/components/UserProfileLayout"
import styles from "src/styles/pages/user/AddProduct.module.scss"
// FontAwesome lib
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleLeft, faImage } from "@fortawesome/free-solid-svg-icons"
// React, Next lib
import { useState } from "react"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import Link from "next/link"
// Custom lib
import dbConnect from "src/lib/dbConnect"
import createImgUrls from "src/lib/firebase"
// Model
import User from "src/models/User"
import Seller from "src/models/Seller"
// Component
import AddItemImg from "src/components/AddItemImg"

export default function AddProduct({ user, seller }) {
  const router = useRouter()
  const [imgBlobs, setImgBlobs] = useState([])
  const [inputs, setInputs] = useState({
    name: "",
    category: "",
    price: "",
    amount: "",
    detail: "",
  })
  const [inputsValidation, setInputValidation] = useState({
    error: false,
    name: false,
    category: false,
    price: false,
    amount: false,
    detail: false,
    images: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "price" || name === "amount") {
      const re = /^0/ // RegEx, String start with 0
      if (!re.test(value)) {
        // This input not start with 0
        setInputs({ ...inputs, [name]: value })
      }
    } else {
      setInputs({ ...inputs, [name]: value })
    }
  }

  const handleFileSync = (blob, index) => {
    setImgBlobs((prev) => {
      const newArrayBlobs = [...prev]
      newArrayBlobs[index] = blob
      return newArrayBlobs
    })
  }

  // Seller cancel cropped image
  const handleDeleteCropped = (index) => {
    setImgBlobs((prev) => {
      const newArrayBlobs = [...prev]
      newArrayBlobs[index] = null
      return newArrayBlobs
    })
  }

  const handleSubmit = async () => {
    // Input validation (If all input not null, checkNull is true, otherwise checkNull is false)
    const imgsNull = imgBlobs.every((img) => img == null) // Check images input is null or not
    const checkNull =
      !!inputs.name &&
      !!inputs.category &&
      !!inputs.price &&
      !!inputs.amount &&
      !!inputs.detail &&
      !imgsNull

    if (!checkNull) {
      // Some input(s) is invalid
      const validation = {
        error: true,
        name: inputs.name ? false : true,
        category: inputs.category ? false : true,
        price: inputs.price ? false : true,
        amount: inputs.amount ? false : true,
        detail: inputs.detail ? false : true,
        images: imgsNull,
      }
      setInputValidation(validation)
    } else {
      // All inputs is valid
      const imgUrls = await createImgUrls(imgBlobs)
      const res = await fetch("/api/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...inputs,
          images: imgUrls,
          sellerName: seller.storeName,
          sellerId: seller.id,
        }),
      })

      if (res.ok) {
        router.push("/me/sellingorders")
      }
    }
  }

  return (
    <div className={styles.container}>
      <Layout user={user}>
        <div>
          <div className={styles.main}>
            <section>
              <div className={styles.header}>
                <Link href="/me/sellingorders" passHref>
                  <a>
                    <div className={styles.icon}>
                      <FontAwesomeIcon icon={faChevronCircleLeft} size={"lg"} />
                    </div>
                  </a>
                </Link>
                <div className={styles.title}>Add Product</div>
              </div>

              <div className={styles.body}>
                {/* Culumn1 */}
                <div className={styles.body_table}>
                  {/* Row1 */}
                  <div className={styles.edit}>
                    <div className={styles.edit_section}>
                      <label>Product name</label>
                      <input
                        type="text"
                        size="50"
                        name="name"
                        onChange={handleChange}
                        className={
                          inputsValidation.name ? styles.outline_red : null
                        }
                      />
                      {inputsValidation.name ? (
                        <span className={styles.invalidText}>
                          This field is required
                        </span>
                      ) : null}
                    </div>
                  </div>
                  {/* Row2 */}
                  <div className={styles.edit}>
                    <div className={styles.edit_section}>
                      <label htmlFor="">Category</label>
                      <select
                        name="category"
                        value={inputs.category}
                        onChange={handleChange}
                        className={
                          inputsValidation.category ? styles.outline_red : null
                        }
                      >
                        <option value="" disabled>
                          --Select--
                        </option>
                        <option value="Accessories">Accessories</option>
                        <option value="Food & Beverages">
                          Food & Beverages
                        </option>
                        <option value="Hobbies & Books">Hobbies & Books</option>
                        <option value="Home Appliances">Home Appliances</option>
                        <option value="Men Clothes">Men Clothes</option>
                        <option value="Mobiles & Gadgets">
                          Mobiles & Gadgets
                        </option>
                        <option value="Sports & Outdoors">
                          Sports & Outdoors
                        </option>
                        <option value="Women Clothes">Women Clothes</option>
                      </select>
                      {inputsValidation.category ? (
                        <span className={styles.invalidText}>
                          This field is required
                        </span>
                      ) : null}
                    </div>
                    <div className={styles.edit_section}>
                      <label htmlFor="">Price</label>
                      <input
                        type="number"
                        placeholder="Bath"
                        size="7"
                        name="price"
                        value={inputs.price}
                        onChange={handleChange}
                        className={
                          inputsValidation.price ? styles.outline_red : null
                        }
                      />
                      {inputsValidation.price ? (
                        <span className={styles.invalidText}>
                          This field is required
                        </span>
                      ) : null}
                    </div>
                    <div className={styles.edit_section}>
                      <label htmlFor="">Amount</label>
                      <input
                        type="number"
                        placeholder="1"
                        name="amount"
                        pattern="[0-9]*"
                        value={inputs.amount}
                        onChange={handleChange}
                        className={
                          inputsValidation.amount ? styles.outline_red : null
                        }
                      />
                      {inputsValidation.amount ? (
                        <span className={styles.invalidText}>
                          This field is required
                        </span>
                      ) : null}
                    </div>
                  </div>
                  {/* Row3 */}
                  <div className={styles.edit}>
                    <div className={styles.edit_section}>
                      <label htmlFor="">Description</label>
                      <textarea
                        id="txtboxMultiline"
                        cols="53"
                        rows="10"
                        name="detail"
                        onChange={handleChange}
                        className={
                          inputsValidation.detail ? styles.outline_red : null
                        }
                      ></textarea>
                      {inputsValidation.detail ? (
                        <span className={styles.invalidText}>
                          This field is required
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Culumn2 */}
                <div className={styles.body_table}>
                  {/* Row1 */}
                  <div className={styles.edit}>
                    <div className={styles.edit_section_image}>
                      <label>Product image</label>
                      {/* Big image input */}
                      <div className={styles.block}>
                        <AddItemImg
                          handleFileSync={handleFileSync}
                          size="lg"
                          index={0}
                          handleDeleteCropped={handleDeleteCropped}
                        />
                        <AddItemImg
                          handleFileSync={handleFileSync}
                          size="lg"
                          index={1}
                          handleDeleteCropped={handleDeleteCropped}
                        />
                      </div>
                      {/* Small image input */}
                      <div className={styles.img}>
                        <div className={styles.block}>
                          <AddItemImg
                            handleFileSync={handleFileSync}
                            size="sm"
                            index={2}
                            handleDeleteCropped={handleDeleteCropped}
                          />
                          <AddItemImg
                            handleFileSync={handleFileSync}
                            size="sm"
                            index={3}
                            handleDeleteCropped={handleDeleteCropped}
                          />
                          <AddItemImg
                            handleFileSync={handleFileSync}
                            size="sm"
                            index={4}
                            handleDeleteCropped={handleDeleteCropped}
                          />
                        </div>
                      </div>
                      {inputsValidation.images ? (
                        <span className={styles.invalidText}>
                          This field is required (At least 1 image)
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              {/* Button */}
              <div className={styles.button_wrapper}>
                <div className={styles.addBtn} onClick={handleSubmit}>
                  Add product
                </div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })

  if (session) {
    await dbConnect()
    const leanResponse = await User.findOne(
      {
        name: session.user.name,
        email: session.user.email,
      },
      { name: 1, email: 1, image: 1, _id: 1 }
    ).lean()

    leanResponse._id = leanResponse._id.toString()

    const sellerLeanResponse = await Seller.findOne(
      { userId: leanResponse._id },
      { _id: 0 }
    ).lean()

    return {
      props: {
        user: leanResponse,
        seller: sellerLeanResponse,
      },
    }
  } else {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    }
  }
}
