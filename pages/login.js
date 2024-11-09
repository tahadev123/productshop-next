import { useRouter } from "next/router"
import Link from "next/link";
import Image from "next/image"
import { useState } from "react";

import { useLogin } from "../services/mutations";

import logo from "../public/images/Union.png";
import styles from "../styles/RegisterPage.module.css";
import { getCookie, setCookie } from "../utils/cookie";

function LoginPage() {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = form;
  const { mutate } = useLogin();
  const router = useRouter()
  const cookie = getCookie("token")

  if (cookie) {
    router.push("/")
  }

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  const loginHandler = (e) => {
    e.preventDefault();

    if (!username || !password) {
      return setError("مقادیر هر فیلد را وارد کنید");
    }

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          console.log(data.data);
          setCookie("token", data.data?.token);
          window.location.reload();
        },
        onError: (error) => {
          console.log(error.message);
          if (error.message === "Request failed with status code 400") {
            setError("کاربری با این مشخصات وجود ندارد");
          }
        },
      }
    );
  };

  return (
    <>
      <div className={styles.container}>
        <h1>بوت کمپ بوتواستارت</h1>
        <div className={styles.loginForm}>
          <Image src={logo} alt="logo" />
          <p>فرم ورود</p>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={loginHandler}>
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
            <button type="submit" className={styles.buttonForm}>
              ورود
            </button>
          </form>
          <Link href="/register">!ایجاد حساب کاربری</Link>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
