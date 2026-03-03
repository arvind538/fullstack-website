import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const productData = [
    // { id: 1, title: "Smart Watch", price: "₹1999", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500" },
    // { id: 2, title: "Headphones", price: "₹1499", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    // { id: 3, title: "Shoes", price: "₹2499", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
    { id: 4, title: "Backpack", price: "₹999", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500" },

    { id: 7, title: "Bluetooth Speaker", price: "₹2499", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500" }, { id: 8, title: "Gaming Mouse", price: "₹999", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500" }, { id: 9, title: "Keyboard", price: "₹1499", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500" }, { id: 10, title: "LED Monitor", price: "₹8999", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500" }, { id: 11, title: "Camera", price: "₹25999", image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=500" }, { id: 12, title: "Power Bank", price: "₹1299", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500" }, { id: 13, title: "Tablet", price: "₹18999", image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500" }, { id: 14, title: "Smart TV", price: "₹32999", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500" }, { id: 15, title: "Printer", price: "₹7499", image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=500" }, { id: 16, title: "Router", price: "₹1999", image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500" }, { id: 17, title: "External Hard Drive", price: "₹5499", image: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=500" },
];

const NewProducts = () => {

    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    // ✅ Add Function
    const addToCart = (product) => {
        const exists = cart.find(item => item.id === product.id);
        if (!exists) {
            setCart([...cart, product]);
        }
    };

    // ✅ Remove Function
    const removeFromCart = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
    };

    return (
        <div className="w-full max-w-screen-xl mx-auto px-4 py-8">

            <h2 className="text-center text-2xl font-bold mb-4">
                Our Products
            </h2>

            {/* Go To Cart Button */}
            <div className="text-center mb-6">
                <button
                    onClick={() => navigate("/cart", { state: cart })}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                    Go To Cart ({cart.length})
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {productData.map((item) => (
                    <div
                        key={item.id}
                        className="border rounded-xl p-4 shadow hover:shadow-lg transition"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-48 object-cover rounded-lg"
                        />

                        <h3 className="text-lg font-semibold mt-3">
                            {item.title}
                        </h3>

                        <p className="text-orange-500 font-bold">
                            {item.price}
                        </p>

                        {/* ✅ Buttons with Proper Spacing */}
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => addToCart(item)}
                                className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
                            >
                                Add to Cart
                            </button>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>

                    </div>
                    
                ))}
            </div>

        </div>
    );
};

export default NewProducts;