/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import CartItem from "../components/CartItem"
import { useCart } from "../hooks/useCart";
import { TiShoppingCart } from "react-icons/ti";
import { useEffect } from "react";
import PaypalButton from "../components/PaypalButton";


function CartPage() {
  const { cart } = useCart()
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (cart.length > 0) {
      let total = cart.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity
      }, 0)
      setTotalPrice(total.toFixed(2))
    }
  }, [cart])

  return (
    <>
      <h1 className="text-2xl mb-4">Cesta</h1>
      {
        cart.length > 0 ? (
          <div className="w-full flex flex-wrap gap-y-4">
            <div className="grow flex flex-col gap-4">
              {/* info del item */}
              {
                cart.map((itemCart) => (
                  <CartItem key={itemCart.id_game} item={itemCart} />
                ))

              }
            </div>
            <div className="grow md:ml-14">
              {/* Resumen del carrito */}
              <h2 className="text-2xl mb-5">Resumen</h2>
              <div className="bg-white/10 p-6 rounded-md flex flex-col gap-y-3">
                <div className="flex justify-between">
                  <span className="text-lg font-medium">Total:</span>
                  <span className="font-bold">{totalPrice}€</span>
                </div>
                <div className="w-full">
                  <PaypalButton totalPrice={totalPrice} cart={cart} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 w-full max-w-xl m-auto flex flex-col items-center justify-center p-8 rounded-md">
            <div className="p-8 flex flex-col items-center justify-center">
              <TiShoppingCart className="text-6xl text-[#ff346d]" />
              <div className="text-xl text-center font-medium">Tu cesta está vacía</div>
            </div>
          </div>
        )
      }

    </>
  )
}

export default CartPage