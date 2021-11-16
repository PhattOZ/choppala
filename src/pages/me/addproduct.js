import Layout from "src/components/UserProfileLayout"
import styles from "src/styles/pages/user/AddProduct.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleLeft, faImage } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"
import { getSession } from "next-auth/react"
import { storageRef } from "src/lib/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import AddItemImg from "src/components/AddItemImg"
import { useState } from "react"
import { useRouter } from "next/router"

export default function AddProduct({ user }) {
  const router = useRouter()
  const [imgBlobs, setImgBlobs] = useState([])
  const [inputs, setInputs] = useState({
    productName: "",
    category: "",
    price: "",
    amount: "",
    description: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: value })
  }

  const handleFileSync = (blob, index) => {
    setImgBlobs((prev) => {
      const newArrayBlobs = [...prev]
      newArrayBlobs[index] = blob
      return newArrayBlobs
    })
  }

  const handleSubmit = async () => {
    // Needs validation !!!!!!!!!!!!!!

    const imgUrls = []

    if (imgBlobs.length) {
      await Promise.all(
        imgBlobs.map(async (blob) => {
          if (blob) {
            const filename = blob.name
            const fullname = new Date().getTime().toString() + "-" + filename
            const fileRef = ref(storageRef, `/${fullname}`)

            const snapshot = await uploadBytes(fileRef, blob)
            const url = await getDownloadURL(snapshot.ref)

            imgUrls.push(url)
          }
        })
      )

      const res = await fetch("/api/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, imgUrls: imgUrls }),
      })

      if (res.ok) {
        router.push("/me/yourproduct")
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
                        name="productName"
                        onChange={handleChange}
                      />
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
                        <option value="Mobiles & Gadget">
                          Mobiles & Gadgets
                        </option>
                        <option value="Sport & Outdoors">
                          Sport & Outdoors
                        </option>
                        <option value="Women Clothes">Women Clothes</option>
                      </select>
                    </div>
                    <div className={styles.edit_section}>
                      <label htmlFor="">Price</label>
                      <input
                        type="text"
                        placeholder="Bath"
                        size="7"
                        name="price"
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.edit_section}>
                      <label htmlFor="">Amount</label>
                      <input
                        type="number"
                        placeholder="1"
                        name="amount"
                        onChange={handleChange}
                      />
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
                        name="description"
                        onChange={handleChange}
                        required
                      ></textarea>
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
                        />
                        <AddItemImg
                          handleFileSync={handleFileSync}
                          size="lg"
                          index={1}
                        />
                      </div>
                      {/* Small image input */}
                      <div className={styles.img}>
                        <div className={styles.block}>
                          <AddItemImg
                            handleFileSync={handleFileSync}
                            size="sm"
                            index={2}
                          />
                          <AddItemImg
                            handleFileSync={handleFileSync}
                            size="sm"
                            index={3}
                          />
                          <AddItemImg
                            handleFileSync={handleFileSync}
                            size="sm"
                            index={4}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Button */}
              <div className={styles.button_wrapper}>
                <div className={styles.cancelBtn}>Cancel</div>
                <div className={styles.addBtn} onClick={handleSubmit}>
                  Add product
                </div>
                {/* <div className={styles.deleteBtn}>Delete</div> */}
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
      { _id: 0 }
    ).lean()

    return {
      props: {
        user: JSON.parse(JSON.stringify(leanResponse)),
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
