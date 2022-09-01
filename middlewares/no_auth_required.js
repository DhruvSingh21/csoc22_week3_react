import router from "next/router";

export default function checkLogin(token) {
  if (token) {
    router.push("/");
  }
}