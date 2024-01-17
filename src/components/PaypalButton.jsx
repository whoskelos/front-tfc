/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { PayPalButtons } from "@paypal/react-paypal-js"
import { toast } from 'sonner';
import { useCart } from "../hooks/useCart";
import { sendTransactionCompleteMail } from "../api/apiMailing";
const PAYPAL_API="https://node-gamekeyzone.fly.dev/api/v1/paypal"
function PaypalButton({ totalPrice, cart }) {
    const { clearCart } = useCart()
    const createOrder = async (data, actions) => {
        try {
            const response = await fetch(`${PAYPAL_API}/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ totalPrice })
            });

            if (!response.ok) {
                throw new Error('Fallo al crear orden de PayPal');
            }

            const responseData = await response.json();
            return responseData.id;
        } catch (error) {
            toast.error('Error creando orden de Paypal');
            console.error('Error creando orden de Paypal:', error);
            throw error;
        }
    };

    const onApprove = async (data, actions) => {
        try {
            const response = await fetch(`${PAYPAL_API}/capture-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderID: data.orderID })
            })

            if (!response.ok) {
                toast.error('Fallo al aprobar la orden de PayPal');
                throw new Error('Fallo al aprobar la orden de PayPal');
            }

            const responseData = await response.json();
            if (responseData.status === 'COMPLETED') {
                clearCart()
                const res = await sendTransactionCompleteMail(cart)
                if (res.status === "success") {
                    toast.success(res.message);
                }else {
                    toast.info("Email no enviado")
                }
            }
            return responseData
        } catch (error) {
            toast.error('Error al aprobar la orden de PayPal');
            console.error('Error al aprobar la orden de PayPal:', error);
            throw error;
        }
    }

    return (
        <>
            <PayPalButtons createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)} forceReRender={[totalPrice]} />
        </>
    );
}

export default PaypalButton