import Image from "next/image";
import { useState, useEffect } from "react";
import { useProducts } from "../services/queries";
import { Oval } from "react-loader-spinner";

import trashIcon from "../public/icons/trash.svg";
import editIcon from "../public/icons/edit.svg";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

import styles from "./Products.module.css";

function Products({ steps, search }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productId, setProductId] = useState("");
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const { data, error, refetch } = useProducts(steps);
  let product = data?.data.data;
  console.log(error);
  

  const searchProduct = product?.filter((item) => item.name.includes(search));

  return (
    <>
      {domLoaded && (
        <>
          {showDeleteModal ? (
            <DeleteModal
              productId={productId}
              setShowDeleteModal={setShowDeleteModal}
              refetch={refetch}
            />
          ) : null}
          {showEditModal ? (
            <EditModal
              productId={productId}
              setShowEditModal={setShowEditModal}
              searchProduct={searchProduct}
              refetch={refetch}
            />
          ) : null}
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th>نام کالا</th>
                <th>موجودی</th>
                <th>قیمت</th>
                <th>شناسه کالا</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {searchProduct ? (
                <>
                  {searchProduct?.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>
                        {item.price === "" ||
                        Number(item.price).toLocaleString() === "NaN"
                          ? "مقدار درست وارد نشده"
                          : Number(item.price).toLocaleString()}
                        {item.price === "" ||
                        Number(item.price).toLocaleString() === "NaN"
                          ? null
                          : item.price > 1000000
                          ? "میلیون تومان"
                          : "هزار تومان"}
                      </td>
                      <td>{item.id}</td>
                      <td>
                        <button
                          onClick={() => {
                            setShowDeleteModal(true);
                            setProductId(item.id);
                          }}
                          className={styles.deleteBtn}
                        >
                          <Image src={trashIcon} alt="trash-icon" />
                        </button>
                        <button
                          onClick={() => {
                            setShowEditModal(true);
                            setProductId(item.id);
                          }}
                          className={styles.editBtn}
                        >
                          <Image src={editIcon} alt="edit-icon" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <div className={styles.loader}>
                  { error?.message === "Request failed with status code 400" ? <p>محصولی پیدا نشد</p> : <Oval color="#55A3F0" secondaryColor="#55a2f090" /> }
                </div>
              )}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default Products;
