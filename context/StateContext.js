import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find(
            (item) => item.id_product === product.id_product
        )

        setTotalPrice((prev) => prev + product.price * quantity)
        setTotalQuantities((prev) => prev + quantity)

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct.id_product === product.id_product)
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity,
                    }

                return cartProduct
            })

            setCartItems(updatedCartItems)
        } else {
            setCartItems([...cartItems, { ...product, quantity }])
        }


    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item.id_product === product.id_product);
        const newCartItems = cartItems.filter((item) => item.id_product !== product.id_product);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuanitity = (id, value) => {
        foundProduct = cartItems.find((item) => item.id_product === id)
        index = cartItems.findIndex((product) => product.id_product === id);
        const newCartItems = cartItems.filter((item) => item.id_product !== id)

        if (value === 'inc') {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);

            setTotalPrice((prevTotalPrice) => parseInt(prevTotalPrice) + parseInt(foundProduct.price))

            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);

                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)

                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            }
        }
    }




    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    };

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1
        })
    };

    return (
        <Context.Provider value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            onRemove,
            toggleCartItemQuanitity
        }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)