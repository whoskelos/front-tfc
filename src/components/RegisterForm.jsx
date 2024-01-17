import { useState } from "react"
import { useAuth } from "../hooks/useAuth.js"
import { useNavigate } from "react-router-dom"
import { useCart } from "../hooks/useCart";
import Alert from "./Alert.jsx"
import { Link } from "react-router-dom"
import { toast } from 'sonner';
import { FaEye, FaEyeSlash } from "react-icons/fa";


function RegisterForm() {
    const { signUp } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState();
    const { setEmail } = useCart()
    const [showPasswd, setShowPasswd] = useState(false);


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
                await signUp(user.email, user.password)
                setEmail(user.email)
                toast.success("Usuario creado correctamente")
                navigate('/')
            } catch (error) {
                setError(error.message);
            }
        } else {
            setError('Por favor, rellene todos los campos.')
        }
    }

    return (
        <div className="w-full flex flex-col items-center justify-center h-full pt-10 text-black">
            {error && <Alert message={error} />}
            <form onSubmit={handleSubmit} className="w-full md:max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold tracking-wider mb-2">Registro</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" name="email" id="email" placeholder="youremail@email.com" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <div className="relative">
                        <input type={showPasswd ? "text" : "password"} name="password" id="password" placeholder="*******" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        <div onClick={() => setShowPasswd(!showPasswd)} className="">
                            {
                                showPasswd ? <FaEye className="text-2xl absolute top-1/2 right-3 -translate-y-1/2" /> : <FaEyeSlash className="text-2xl absolute top-1/2 right-3 -translate-y-1/2" />
                            }
                        </div>
                    </div>
                </div>
                <button className="bg-[#ff346d] hover:bg-sky-500 transition-colors text-white w-[99px] font-bold py-2 px-4 rounded focus:outline-none">Registrar</button>
            </form>
            <div className="w-full md:max-w-md">
                <p className="text-white text-sm font-medium flex justify-between my-4 px-3">¿Ya tienes cuenta? <Link className="hover:text-sky-400" to={"/login"}>Acceder</Link></p>
            </div>
        </div>
    )
}

export default RegisterForm