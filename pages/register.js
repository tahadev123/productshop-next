import { useRouter } from "next/router";
import { useState } from "react";
import { useRegister } from "../services/mutations";
import { getCookie } from "../utils/cookie";
import Link from "next/link";
import Image from "next/image";

import logo from "../public/images/Union.png";
import styles from "../styles/RegisterPage.module.css";

function RegisterPage() {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { username, password, confirmPassword } = form;
  const { mutate } = useRegister();
  const router = useRouter();
  const cookie = getCookie("token");

  if (cookie) {
    router.push("/");
  }

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  const registerHandler = (e) => {
    e.preventDefault();

    if (!username || !password) {
      return setError("مقادیر هر فیلد را وارد کنید");
    }
    if (password !== confirmPassword) {
      return setError("دو رمز عبور با هم یکسان نیستند");
    }

    mutate(
      { username, password },
      {
        onSuccess: () => {
          router.push("/login");
          setError("");
        },
        onError: (error) => {
          if (error.message === "Request failed with status code 400") {
            setError("این کاربر قبلا ساخته شده است");
          }
        },
      }
    );
  };

  return (
    <>
      <div className={styles.container}>
        <h1>بوت کمپ بوتواستارت</h1>
        <div className={styles.registerForm}>
          <Image src={logo} alt="logo" />
          <p>فرم ثبت نام</p>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={registerHandler}>
            <input
              className={styles.inputForm}
              type="text"
              id="username"
              name="username"
              placeholder="نام کاربری"
              value={username}
              onChange={changeHandler}
            />
            <input
              className={styles.inputForm}
              type="text"
              id="password"
              name="password"
              placeholder="رمز عبور"
              value={password}
              onChange={changeHandler}
            />
            <input
              className={styles.inputForm}
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="تکرار رمز عبور"
              value={confirmPassword}
              onChange={changeHandler}
            />
            <button type="submit" className={styles.buttonForm}>
              ثبت نام
            </button>
          </form>
          <Link href="/login">حساب کاربری دارید؟</Link>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
