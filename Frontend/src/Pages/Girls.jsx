import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const products = [
    {
        id: 1,
        title: "Girls Kurti",
        price: 1299,
        image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500"
    },
    {
        id: 2,
        title: "Girls Jeans",
        price: 1699,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500"
    },
    {
        id: 3,
        title: "Girls Top",
        price: 899,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        id: 4,
        title: "Girls Hoodie",
        price: 1499,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"
    },
    {
        id: 5,
        title: "Girls Saree",
        price: 2499,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500"
    },
    {
        id: 6,
        title: "Girls Skirt",
        price: 1199,
        image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=500&auto=format&fit=crop"
    },
    {
        id: 7,
        title: "Girls Jacket",
        price: 1999,
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 8,
        title: "Girls Party Dress",
        price: 2799,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500"
    }
];

const Girls = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const addToCart = (product) => {
        const exist = cart.find((item) => item.id === product.id);

        if (exist) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const decreaseQty = (id) => {
        setCart(
            cart
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold text-center mb-10">
                Men's Clothing Collection
            </h2>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-56 object-cover"
                        />

                        <div className="p-5 flex-grow">
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-orange-600 font-bold mt-2">
                                ₹{item.price}
                            </p>

                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => addToCart(item)}
                                    className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                >
                                    Add
                                </button>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cart Section */}
            <div className="mt-14">
                <h2 className="text-2xl font-bold mb-6">Cart Items</h2>

                {cart.length === 0 ? (
                    <p className="text-gray-500">Cart is empty</p>
                ) : (
                    <>
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center border p-4 rounded-xl"
                                >
                                    <div>
                                        <h4 className="font-semibold">{item.title}</h4>
                                        <p>
                                            ₹{item.price} × {item.quantity}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => decreaseQty(item.id)}
                                            className="px-3 py-1 bg-gray-200 rounded"
                                        >
                                            -
                                        </button>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-right font-bold text-xl mt-6">
                            Total: ₹{totalPrice}
                        </div>

                        <div className="text-center mt-6">
                            <button
                                onClick={() => navigate("/cart", { state: cart })}
                                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                            >
                                Go To Cart ({cart.length})
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Girls;
