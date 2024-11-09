import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "../utils/cookie";

import Header from "../components/Header";
import WebTitle from "../components/WebTitle";
import Products from "../components/Products";
import Pagination from "../components/Pagination";

function HomePage() {
  const [steps, setSteps] = useState(1);
  
  const router = typeof window !== "undefined" ? useRouter() : null;

  const [search, setSearch] = useState("")
  
  useEffect(() => {
    const cookie = getCookie("token");

    if (!cookie) {
      router.push("/register");
    }
  }, [router]);

  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <WebTitle />
      <Products steps={steps} search={search} />
      <Pagination steps={steps} setSteps={setSteps} />
    </>
  );
}

export default HomePage;
