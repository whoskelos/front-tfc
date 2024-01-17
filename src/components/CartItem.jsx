import { TiPlus, TiTrash } from "react-icons/ti";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */
function CartItem({ item }) {
    const { removeFromCart, addToCart } = useCart()
    const { background_image, name, quantity, price } = item
    const logoPlatform = item.store.slug;
    const namePlatform = item.store.name;
    return (
        <div className="bg-white/10 p-3 md:p-8 flex gap-3 rounded-md items-center justify-around md:justify-between">
            <Link to={`/games/${item.slug}`}>
                <picture>
                    <img src={background_image} alt={name} className="w-20 md:w-48 object-cover rounded-md"/>
                </picture>
            </Link>
            <div className="flex flex-col items-center gap-2">
                <img src={`/${logoPlatform}.svg`} alt={logoPlatform} className="w-6 md:w-8" />
                <span className="text-sm text-center md:text-lg">
                    {namePlatform}
                </span>
            </div>
            <div className="flex items-center justify-center">
                <span className="font-medium text-sm md:text-xl md:p-2">{price}€</span>
                <button onClick={() => addToCart(item)} className="flex items-center md:p-2">
                    <TiPlus className="text-sm md:text-2xl hover:text-sky-400 transition-colors" />
                    <span className="text-sm md:text-lg">{quantity}</span>
                </button>
                <button onClick={() => removeFromCart(item)} className="md:p-2">
                    <TiTrash className="text-2xl md:text-4xl hover:text-red-400 transition-colors" />
                </button>
            </div>
        </div>
    )
}

export default CartItem