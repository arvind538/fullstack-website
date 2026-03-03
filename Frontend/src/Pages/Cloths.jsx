import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const clothesData = [
    { id: 1, title: "Men T-Shirt", price: 799, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" },
    { id: 2, title: "Women Kurti", price: 1299, image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500" },
    { id: 4, title: "Formal Shirt", price: 1499, image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500" },
    { id: 5, title: "Jeans", price: 1799, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500" },
    { id: 6, title: "Hoodie", price: 1599, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
    { id: 7, title: "Saree", price: 2499, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500" },
    { id: 8, title: "Blazer", price: 2999, image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=500" },
    { id: 10, title: "Kids Wear", price: 699, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500" },
];

const Cloths = () => {
    const [cart, setCart] = useState([]);
     const navigate = useNavigate();

    // Add to Cart
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

    // Remove completely
    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    // Decrease quantity
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
                Clothing Collection
            </h2>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {clothesData.map((item) => (
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

                            <div className="text-center mb-6">
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

export default Cloths;