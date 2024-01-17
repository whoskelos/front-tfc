import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth.js"
import Alert from "./Alert.jsx"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useCart } from "../hooks/useCart";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginForm() {
    const { signIn, resetPassword } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState();
    const [showPasswd, setShowPasswd] = useState(false);
    const { setEmail } = useCart()
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (user.email !== '' && user.password !== '') {
            try {
                await signIn(user.email, user.password)
                setEmail(user.email);
                navigate('/')
            } catch (error) {
                setError(error.message);
            }
        } else {
            setError('Por favor, rellene todos los campos.')
        }
    }

    const handleResetPassword = async () => {
        if (!user.email) return setError("Inserta tu email")
        if (!pattern.test(user.email)) return setError('Formato email incorrecto')
        try {
            await resetPassword(user.email)
            setError('Te hemos enviado un email con un link para restablecer la contraseña!')
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setError('')
        }, 6000)
    }, [error])

    return (
        <div className="w-full flex flex-col items-center justify-center h-full pt-10 text-black">
            {error && <Alert message={error} />}
            <form onSubmit={handleSubmit} className="w-full md:max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold tracking-wider mb-2">Iniciar sesión</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" name="email" id="email" placeholder="youremail@email.com" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                    <div className="relative">
                        <input type={showPasswd ? "text" : "password"} name="password" id="password" placeholder="*******" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        <div onClick={() => setShowPasswd(!showPasswd)} className="">
                            {
                                showPasswd ? <FaEye className="text-2xl absolute top-1/2 right-3 -translate-y-1/2" /> : <FaEyeSlash className="text-2xl absolute top-1/2 right-3 -translate-y-1/2" />
                            }
                        </div>
                    </div>
                </div>

                <div className="w-full flex items-center justify-between">
                    <button className="bg-[#ff346d] hover:bg-sky-500 transition-colors text-white w-[99px] font-bold py-2 px-4 rounded focus:outline-none">Acceder</button>

                    <a href="#!" className="inline-block align-baseline font-bold text-sm text-end text-blue-500 hover:text-blue-800" onClick={handleResetPassword}>¿Olvidaste tu contraseña?</a>
                </div>

            </form>
            <div className="w-full md:max-w-md">
                <p className="text-white text-sm font-medium flex justify-between my-4 px-3">¿No tienes cuenta? <Link className="hover:text-sky-400" to={"/register"}>Registrarse</Link></p>
            </div>
        </div>
    )
}

export default LoginForm