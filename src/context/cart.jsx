/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { createContext, useReducer } from "react";

export const CartContext = createContext()

const initialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const updateLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

const reducer = (state, action) => {
    const { type: actionType, payload: actionPayload, userEmail } = action
    switch (actionType) {
        case 'ADD_TO_CART': {
            const { id_game } = actionPayload
            const productInCartIndex = state.findIndex(item => item.id_game === id_game)
            
            if (productInCartIndex >= 0) {
                const newState = structuredClone(state)
                newState[productInCartIndex].quantity += 1
                updateLocalStorage(newState)
                return newState
            }

            const newState = [
                ...state,
                {
                    ...actionPayload, // product
                    userEmail: userEmail,
                    quantity: 1
                }
            ]

            updateLocalStorage(newState)
            return newState
        }

        case 'REMOVE_FROM_CART': {
            const { id_game } = actionPayload
            const newState = state.filter(item => item.id_game !== id_game)
            updateLocalStorage(newState)
            return newState
        }

        case 'CLEAR_CART': {
            updateLocalStorage(initialState)
            return initialState
        }

    }
    return state
}

export function CartProvider({ children }) {
    const [email, setEmail] = useState("");
    const [state, dispatch] = useReducer(reducer, initialState)
    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product,
        userEmail: email
    })

    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })


    const clearCart = () => dispatch({ type: 'CLEAR_CART' })

    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            clearCart,
            removeFromCart,
            setEmail

        }}>
            {children}
        </CartContext.Provider >
    )
}