import Layout from "src/components/UserProfileLayout"
import styles from "src/styles/pages/user/AddProduct.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleLeft, faImage } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"
import { getSession } from "next-auth/react"
import { upload } from "src/lib/firebase"
import AddItemImg from "src/components/AddItemImg"

function handleUpload(e) {
  const [file] = e.target.files

  if (file) {
    const url = URL.createObjectURL(file)
    setImgURL(url)
  }

  if (file) {
    const filename = encodeURIComponent(file.name)
    upload(filename, file)
  }
}

export default function AddProduct({ user }) {
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
                      <input type="text" size="50" />
                    </div>
                  </div>
                  {/* Row2 */}
                  <div className={styles.edit}>
                    <div className={styles.edit_section}>
                      <label htmlFor="">Category</label>
                      <select id="cars" name="cars" size="1">
                        <option>--Select--</option>
                        <option>Accessories</option>
                        <option>Food & Beverages</option>
                        <option>Hobbies & Books</option>
                        <option>Home Appliances</option>
                        <option>Men Clothes</option>
                        <option>Mobiles & Gadgets</option>
                        <option>Sport & Outdoors</option>
                        <option>Women Clothes</option>
                      </select>
                    </div>
                    <div className={styles.edit_section}>
                      <label htmlFor="">Price</label>
                      <input type="text" placeholder="Bath" size="7" />
                    </div>
                    <div className={styles.edit_section}>
                      <label htmlFor="">Amount</label>
                      <input type="number" placeholder="1" />
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
                        <AddItemImg />
                        <AddItemImg />
                      </div>
                      {/* Small image input */}
                      <div className={styles.img}>
                        <div className={styles.block}>
                          <AddItemImg />
                          <AddItemImg />
                          <AddItemImg />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Button */}
              <div className={styles.button_wrapper}>
                <div className={styles.cancelBtn}>Cancel</div>
                <Link href="/me/youritem" passHref>
                  <div className={styles.addBtn}>Add product</div>
                </Link>
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
