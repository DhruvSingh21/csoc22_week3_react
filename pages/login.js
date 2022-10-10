import { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../context/auth';
import checkLogin from "../middlewares/no_auth_required";

export default function Login() {
  const { token } = useAuth()
  useEffect(()=>{
    checkLogin(token)
  },[])
  return (
    <div>
      <LoginForm />
    </div>
  )
}
