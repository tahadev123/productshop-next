import { useRouter } from "next/router";
import Image from "next/image"
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteProduct } from "../services/mutations"

import { getCookie } from "../utils/cookie";

import closeIcon from "../public/images/Close.png"
import styles from "./Modal.module.css"

function DeleteModal({ productId, setShowDeleteModal, refetch }) {
  const { mutate } = useDeleteProduct();
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteHandler = () => {
    mutate(
      productId,
      {
        onSuccess: () => {
          setShowDeleteModal(false)
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
  };


  return (
    <>
      <div className={styles.container}>
        <div className={styles.deleteModal}>
          <Image src={closeIcon} alt="close-icon" />
          <h4>آیا از حذف این محصول مطمئنید؟</h4>
          <div>
              <button onClick={() => setShowDeleteModal(false)} className={styles.cancelBtn}>لغو</button>
              <button onClick={() => deleteHandler()} className={styles.deleteBtn}>حذف</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteModal