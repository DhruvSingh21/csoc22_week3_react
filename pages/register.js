import RegisterForm from '../components/RegisterForm'
import checkLogin from "../middlewares/no_auth_required";
import { useAuth } from "../context/auth";
import { useEffect } from "react";

export default function Register() {
  const { token } = useAuth();
  useEffect(() => {
    checkLogin(token)
  },[]);
  return (
    <div>
      <RegisterForm />
    </div>
  )
}
