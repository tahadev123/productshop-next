import { useRouter } from "next/router";
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query";

import { useEditProduct } from "../services/mutations";
import { getCookie } from "../utils/cookie";

import styles from "./Modal.module.css"

function EditModal({ productId, setShowEditModal, searchProduct, refetch }) {
  const { mutate } = useEditProduct();
  const queryClient = useQueryClient();
  const router = useRouter();

  const productDetail = searchProduct.filter((item) => item.id === productId)
  console.log(productDetail[0]);
  

  const [form, setForm] = useState({
    name: productDetail[0].name,
    quantity: productDetail[0].quantity,
    price: productDetail[0].price,
  });

  const editHandler = (e) => {
    e.preventDefault()

    mutate(
      {
        id: productId,
        ...form
      },
      {
        onSuccess: (data) => {
          console.log(data)
          setShowEditModal(false)
          refetch()
          queryClient.invalidateQueries({ queryKey: ["products"] })
        },
        onError: (error) => {
          console.log(error.message)
          if (error.message === "Request failed with status code 401") {
            router.push("/login")
          }
          if (error.message === "Request failed with status code 403") {
            document.cookie = `token=${getCookie("token")}; expires=Wed, 18 Dec 2000 12:00:00 GMT`
            router.push("/login")
          }
        }
      }
    )
  }

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.editModal}>
          <div>
            <h3 className={styles.titleModal}>ویرایش اطلاعات</h3>
            <form onSubmit={editHandler}>
              <div className={styles.inputs}>
                <label className={styles.label} htmlFor="name">نام کالا</label>
                <input
                  className={styles.input}
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={changeHandler}
                />
                <label className={styles.label} htmlFor="quantity">تعداد موجودی</label>
                <input
                  className={styles.input}
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={form.quantity}
                  onChange={changeHandler}
                />
                <label className={styles.label} htmlFor="price">قیمت</label>
                <input
                  className={styles.input}
                  type="text"
                  id="price"
                  name="price"
                  value={form.price}
                  onChange={changeHandler}
                />
              </div>
              <button onClick={() => setShowEditModal(false)} className={styles.cancelEditBtn}>انصراف</button>
              <button type="submit" className={styles.editBtn}>ثبت اطلاعات جدید</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditModal