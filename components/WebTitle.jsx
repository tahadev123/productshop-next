import Image from "next/image"
import { useState } from "react"

import styles from "./WebTitle.module.css"

import manageIcon from "../public/icons/setting-3.svg"
import AddProducts from "./addProduct"

function WebTitle() {
  const [addProduct, setAddProduct] = useState(false)

  return (
    <>
      {
        addProduct ? <AddProducts setAddProduct={setAddProduct} /> : null
      }
      <div className={styles.container}>
        <div>
          <Image src={manageIcon} alt="manage-icon" />
          <h3>مدیریت کالا</h3>
        </div>
        <div>
          <button className={styles.addProductBtn} onClick={() => setAddProduct(true)}>افزودن محصول</button>
        </div>
      </div>
    </>
  )
}

export default WebTitle