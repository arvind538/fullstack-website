import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    offerPrice: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    // Data send to process page
    navigate("/process", { state: formData });
  };

  const handleBack = () => {
    navigate(-1); // previous page
  };

  return (
    <>
      <h1 className="mt-4 text-center font-bold text-2xl">
        Payment Process
      </h1>

      <div className="flex justify-center">
        <div className="py-5 bg-white shadow-xl rounded-xl">
          <form
            onSubmit={handleAdd}
            className="md:p-10 p-4 space-y-5 max-w-lg"
          >
            <div className="flex flex-col gap-1">
              <label>Product Name</label>
              <input
                id="name"
                type="text"
                onChange={handleChange}
                className="py-2 px-3 border rounded"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Description</label>
              <textarea
                id="description"
                onChange={handleChange}
                className="py-2 px-3 border rounded"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Category</label>
              <select
                id="category"
                onChange={handleChange}
                className="py-2 px-3 border rounded"
              >
                <option value="">Select</option>
                <option>For Mens</option>
                <option>For Gilrs</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Accessories</option>
              </select>
            </div>

            <div className="flex gap-4">
              <input
                id="price"
                type="number"
                placeholder="Price"
                onChange={handleChange}
                className="py-2 px-3 border rounded w-1/2"
              />

              <input
                id="offerPrice"
                type="number"
                placeholder="Offer Price"
                onChange={handleChange}
                className="py-2 px-3 border rounded w-1/2"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded"
              >
                ADD
              </button>

              <button
                type="button"
                onClick={handleBack}
                className="w-full py-2 bg-red-500 text-white rounded"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Card;