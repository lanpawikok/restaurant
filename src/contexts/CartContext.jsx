import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    function updateCart(item, qty) {
        let product = cart.find((data) => data.id == item.idMeal);
        if (product) {
            setCart((prev) => {
                return prev.map((data) => {
                    if (data.id == item.idMeal) {
                        return { ...data, qty: data.qty + 1 }
                    }
                    return data;
                });
            })
        } else {
            let newProduct = {
                id: item.idMeal,
                title: item.strMeal,
                image: item.strMealThumb,
                price: item.price,
                qty: qty,
            }
            setCart([...cart, newProduct]);
        }
    }

    function updateQtyProduct(id, type) {
        setCart((prev) => {
            return prev.map((item) => {
                if (item.id == id) {
                    if (type == "+") {
                        return { ...item, qty: item.qty + 1 }
                    } else {
                        if (item.qty > 1) {
                            return { ...item, qty: item.qty - 1 }
                        }
                    }
                }
                return item;
            })
        })
    }

    function deleteProduct(id) {
        setCart((prev) => {
            return prev.filter((item) => item.id != id);
        })
    }

    function deleteAll() {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ cart, updateCart, updateQtyProduct, deleteProduct, deleteAll, paymentSuccess, setPaymentSuccess }}>
            {children}
        </CartContext.Provider>
    )
}