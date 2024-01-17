import { NavLink } from "react-router-dom"
import { TiShoppingCart } from "react-icons/ti";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { IoGameControllerOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom"
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth.js";
import { toast } from 'sonner';
import { useEffect } from "react";
import { useState } from "react";
function Navbar() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const { cart } = useCart()
    const [totalQuantity, setTotalQuantity] = useState(0);
    useEffect(() => {
         const newTotal = cart.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.quantity;
        }, 0);
        setTotalQuantity(newTotal)
    },[cart])

    const handleClick = async () => {
        await logout()
        toast.info("Sesión cerrada correctamente")
        window.sessionStorage.removeItem("user")
        window.localStorage.removeItem("cart")
        navigate('/login')
    }
    return (
        <>
            <header className="bg-[#000000bf] bg-opacity-70 backdrop-blur-md px-8 fixed top-0 w-full h-20 z-40 flex justify-between items-center">
                <div>
                    <NavLink to={`/`}>
                        <IoGameControllerOutline className="text-6xl hover:text-[#ff346d] transition-colors" />
                    </NavLink>
                </div>
                <div>
                    <nav className="hidden md:block">
                        <ul className="flex [&>li]:p-3">
                            <li>
                                <NavLink to={`/games/platforms/steam`} className={({ isActive}) => isActive ? 'text-[#ff346d] font-medium' : 'hover:text-[#ff346d] transition-colors"'} >PC</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/games/platforms/playstation-store`} className={({ isActive}) => isActive ? 'text-[#ff346d] font-medium' : 'hover:text-[#ff346d] transition-colors"'}>Playstation</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/games/platforms/xbox-store`} className={({ isActive}) => isActive ? 'text-[#ff346d] font-medium' : 'hover:text-[#ff346d] transition-colors"'}>Xbox</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/games/platforms/nintendo`} className={({ isActive}) => isActive ? 'text-[#ff346d] font-medium' : 'hover:text-[#ff346d] transition-colors"'}>Nintendo</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <nav>
                        <ul className="flex items-center [&>li]:p-3">
                            { user && user.rol === "admin"  ? <li><NavLink to={'/admin'} className={({ isActive}) => isActive ? 'text-[#ff346d] font-medium' : 'hover:text-[#ff346d] transition-colors"'}>ADMIN</NavLink></li> : ''}
                            <li className={`${user && user !== null && user.rol !== 'admin' ? 'text-4xl hover:text-[#ff346d] transition-colors': 'hidden'} relative`}>
                                <NavLink to={"/cart"}><TiShoppingCart/></NavLink>
                                <span className="absolute top-2 left-8 bg-[#ff346d] rounded-full px-2 text-white text-sm font-medium">{totalQuantity}</span>
                            </li>
                            <li className="flex items-center">
                                {
                                    user === null ? <NavLink to={`/login`} className=""><CgProfile className="text-4xl hover:text-[#ff346d] transition-colors" /></NavLink> : <button onClick={handleClick}><CgLogOut  className="text-4xl hover:text-[#ff346d] transition-colors" /></button>
                                }

                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Navbar