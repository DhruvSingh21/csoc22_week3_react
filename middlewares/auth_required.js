/***
 * @todo Redirect the user to login page if token is not present.
 */
import router from "next/router";

export default function checkLogin(token){
  if(!token){
    router.push('/login');
  }
}