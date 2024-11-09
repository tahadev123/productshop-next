import { useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

import { getCookie } from "../utils/cookie"

import styles from "./Header.module.css"
import searchIcon from "../public/icons/search-normal.svg"
import profile from "../public/images/profile.jpg"
import removeUser from "../public/icons/remove.png"

function Header({ search, setSearch }) {
  const router = useRouter() 

  const removeUserHandler = () => {
    document.cookie = `token=${getCookie("token")}; expires=Wed, 18 Dec 2000 12:00:00 GMT`
    router.push("/login")
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.searchBox}>
            <Image src={searchIcon} alt="search-icon" />
            <input type="text" name="search" placeholder="جستجو کالا" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className={styles.profile}>
          <div>
            <Image className={styles.profileImg} src={profile} alt="profile" />
          </div>
          <div>
            <p>طاها دهقان</p>
            <p>مدیر</p>
            <Image onClick={removeUserHandler} className={styles.removeUser} src={removeUser} alt="remove-user-icon" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header