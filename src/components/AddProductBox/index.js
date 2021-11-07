import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import styles from "./AddProductBox.module.scss"
import { faChevronCircleLeft, faImage } from "@fortawesome/free-solid-svg-icons"

export default function AddProductBox() {
  return (
    <>
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
                <form>
                  <div className={styles.edit_section}>
                    <label>Product name</label>
                    <input type="text" size="50" />
                  </div>
                </form>
              </div>
              {/* Row2 */}
              <div className={styles.edit}>
                <form>
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
                </form>
                <form>
                  <div className={styles.edit_section}>
                    <label htmlFor="">Price</label>
                    <input type="text" placeholder="Bath" size="7" />
                  </div>
                </form>
                <form>
                  <div className={styles.edit_section}>
                    <label htmlFor="">Amount</label>
                    <input type="number" placeholder="1" />
                  </div>
                </form>
              </div>
              {/* Row3 */}
              <div className={styles.edit}>
                <form>
                  <div className={styles.edit_section}>
                    <label htmlFor="">Description</label>
                    <textarea
                      id="txtboxMultiline"
                      cols="53"
                      rows="10"
                      required
                    ></textarea>
                  </div>
                </form>
              </div>
            </div>

            {/* Culumn2 */}
            <div className={styles.body_table}>
              {/* Row1 */}
              <div className={styles.edit}>
                <div className={styles.edit_section_image}>
                  <label htmlFor="">Product image</label>
                  {/* Big Image */}
                  <div className={styles.block}>
                    <form>
                      <input
                        type="file"
                        id="file-input"
                        name="myImage"
                        accept="image/x-png,image/gif,image/jpeg"
                      />
                      <label htmlFor="file-input">
                        <FontAwesomeIcon
                          icon={faImage}
                          size="2x"
                          color="#8B8EA1"
                        />
                        Add image
                      </label>
                    </form>
                    <form>
                      <input
                        type="file"
                        id="file-input"
                        name="myImage"
                        accept="image/x-png,image/gif,image/jpeg"
                      />
                      <label htmlFor="file-input">
                        <FontAwesomeIcon
                          icon={faImage}
                          size="2x"
                          color="#8B8EA1"
                        />
                        Add image
                      </label>
                    </form>
                  </div>
                  <div className={styles.img}>
                    <div className={styles.block}>
                      <form>
                        <input
                          type="file"
                          id="file-input"
                          name="myImage"
                          accept="image/x-png,image/gif,image/jpeg"
                        />
                        <label htmlFor="file-input">
                          <FontAwesomeIcon
                            icon={faImage}
                            size="2x"
                            color="#8B8EA1"
                          />
                          Add image
                        </label>
                      </form>
                      <form>
                        <input
                          type="file"
                          id="file-input"
                          name="myImage"
                          accept="image/x-png,image/gif,image/jpeg"
                        />
                        <label htmlFor="file-input">
                          <FontAwesomeIcon
                            icon={faImage}
                            size="2x"
                            color="#8B8EA1"
                          />
                          Add image
                        </label>
                      </form>
                      <form>
                        <input
                          type="file"
                          id="file-input"
                          name="myImage"
                          accept="image/x-png,image/gif,image/jpeg"
                        />
                        <label htmlFor="file-input">
                          <FontAwesomeIcon
                            icon={faImage}
                            size="2x"
                            color="#8B8EA1"
                          />
                          Add image
                        </label>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Button */}
          <div className={styles.button_wrapper}>
            <div className={styles.cancelBtn}>Cancel</div>
            <Link href="/me/youritem">
              <div className={styles.addBtn}>Add product</div>
            </Link>
            {/* <div className={styles.deleteBtn}>Delete</div> */}
          </div>
        </section>
      </div>
    </>
  )
}
