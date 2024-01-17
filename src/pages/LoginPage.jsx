/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import LoginForm from "../components/LoginForm"
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom"

function LoginPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  },[user])
  return (
    <><LoginForm /></>
  )
}

export default LoginPage