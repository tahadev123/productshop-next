import styles from "./Pagination.module.css"

function Pagination({ steps, setSteps }) {
  return (
    <>
      <div className={styles.pagination}>
        <span onClick={() => setSteps(1)} className={steps === 1 ? styles.active : null}>۱</span>
        <span onClick={() => setSteps(2)} className={steps === 2 ? styles.active : null}>۲</span>
        <span onClick={() => setSteps(3)} className={steps === 3 ? styles.active : null}>۳</span>
      </div>
    </>
  )
}

export default Pagination