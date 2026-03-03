import React from "react";
import { useNavigate } from "react-router-dom";

const ClaimNow = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-2">
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl max-w-4xl w-full overflow-hidden grid md:grid-cols-2">

                {/* LEFT SIDE IMAGE */}
                <div className="h-64 md:h-auto">
                    <img
                        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800"
                        alt="Best Offer"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* RIGHT SIDE CONTENT */}
                <div className="p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                        🔥 Best Offer of the Day
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Get amazing discounts on our premium collection.
                        Limited time offer — grab it before it ends!
                    </p>

                    <div className="mb-6">
                        <p className="text-lg line-through text-gray-400">
                            Original Price: ₹1999
                        </p>
                        <p className="text-2xl font-bold text-orange-500">
                            Offer Price: ₹999
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/products")}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                        Claim Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClaimNow;