import Link from "next/link"
import styles from "./Footer.module.scss"
import Image from "next/dist/client/image"

export default function Footer() {
  return (
    <div className={styles.container}>
      <nav className={styles.footernav}>
        <div className={styles.footercol}>
          <Link href="/">
            <a>
              <h5 className={styles.title}>CUSTOMER SERVICE</h5>
            </a>
          </Link>
          <ul className={styles.ul}>
            <li>
              <Link href="/">
                <a className={styles.item}>Help Centre</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a className={styles.item}>How to Buy</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a className={styles.item}>How to Sell</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a className={styles.item}>Product Policy</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.footercol}>
          <Link href="/">
            <a>
              <h5 className={styles.title}>CHOPPALA</h5>
            </a>
          </Link>
          <ul className={styles.ul}>
            <li>
              <Link href="/">
                <a className={styles.item}>About Choppala</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a className={styles.item}>Terms & Conditions</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a className={styles.item}>Privacy Policy</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a className={styles.item}>Security</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.footercol}>
          <Link href="/">
            <a>
              <h5 className={styles.title}>PAYMENT</h5>
            </a>
          </Link>
          <div className={styles.icons}>
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="#8B8EA1"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
              />
              <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
              <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
              <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
            </svg>
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="#8B8EA1"
              viewBox="0 0 16 16"
            >
              <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
          </div>
        </div>

        <div className={styles.footercol}>
          <Link href="/">
            <a>
              <h5 className={styles.title}>FOLLOW US</h5>
            </a>
          </Link>
          <div className={styles.icons}>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#8B8EA1"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#8B8EA1"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/?lang=th"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#8B8EA1"
                viewBox="0 0 16 16"
              >
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
              </svg>
            </a>
          </div>
        </div>
        <div className={styles.footercol}>
          <Link href="/">
            <a>
              <h5 className={styles.title}>APP COMING SOON!</h5>
            </a>
          </Link>

          <div className={styles.appcontainer}>
            <Image
              src="/app-qr-code.svg"
              width={64}
              height={64}
              alt="qr-code"
            />

            <div>
              <div className={styles.appflex}>
                <Image
                  src="/playstore.svg"
                  width={20}
                  height={20}
                  alt="playstore"
                />
                <a
                  className={styles.app}
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Play
                </a>
              </div>
              <div className={styles.appflex}>
                <Image
                  src="/applestore.svg"
                  width={20}
                  height={20}
                  alt="appstore"
                />
                <a
                  className={styles.app}
                  href="https://www.apple.com/th/app-store/"
                  target="_blank"
                  rel="noreferrer"
                >
                  App Store
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className={styles.copyright}>
        © 2021 Choppala. All Rights Reserved
      </div>
    </div>
  )
}
