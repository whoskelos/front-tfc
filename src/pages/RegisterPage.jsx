import { useEffect } from "react";
import RegisterForm from "../components/RegisterForm"
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom"

function RegisterPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  })
  return (
    <>
      <RegisterForm />
    </>
  )
}

export default RegisterPage