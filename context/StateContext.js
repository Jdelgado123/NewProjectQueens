import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    const [size,setSize] = useState("");
    const [permissio,setPermissio] = useState("")

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find(
            (item) => item.id_product === product.id_product
        )

        console.log(product)
        if (product.currency == "USD"){
            setTotalPrice((prev) => (prev + product.price * quantity) * 3.82)
            setTotalQuantities((prev) => prev + quantity)
        }else{
            setTotalPrice((prev) => prev + product.price * quantity)
            setTotalQuantities((prev) => prev + quantity)
        }
        

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
        toast.success("Producto agregado satisfactoriamente")

    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item.id_product === product.id_product);
        const newCartItems = cartItems.filter((item) => item.id_product !== product.id_product);

        if(product.currency == "USD"){
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity * 3.82);
        }else{
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        }
        
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuanitity = (datos, value) => {

        console.log(datos)
        foundProduct = cartItems.find((item) => item.id_product === datos.id_product)
        index = cartItems.findIndex((product) => product.id_product === datos.id_product);
        const newCartItems = cartItems.filter((item) => item.id_product !== datos.id_product)
        
        console.log(newCartItems)
        console.log(foundProduct)

        if (value === 'inc') {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);

            (datos.currency === "USD") ? setTotalPrice((prevTotalPrice) => parseFloat(prevTotalPrice) + (parseFloat(foundProduct.price)) * 3.82) : setTotalPrice((prevTotalPrice) => parseFloat(prevTotalPrice) + parseFloat(foundProduct.price))
            
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);

                (datos.currency === "USD") ? setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * 3.82) : setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)

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
            setCartItems,
            totalPrice,
            setTotalQuantities,
            totalQuantities,
            setQty,
            qty,
            incQty,
            decQty,
            onAdd,
            onRemove,
            toggleCartItemQuanitity,
            size,
            setSize,
            permissio,
            setPermissio
        }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)