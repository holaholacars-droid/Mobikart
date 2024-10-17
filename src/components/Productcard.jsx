import { useUser } from "@clerk/clerk-react";
import React from "react";
import { CardHeader, CardTitle, CardContent } from "./ui/card";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";

function truncateText(text, limit) {
  if (text.length > limit) {
    return text.substring(0, limit) + '...';
  }
  return text;
}

function Productcard({ product }) {
  const { user } = useUser();
  return (
    <div className="">
      <div className="text-white rounded-lg shadow-lg p-4 max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3">
            <div className=" p-4 flex justify-center items-center">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full object-contain rounded-2xl"
                />
              ) : (
                <div className="">Image not available</div>
              )}
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="flex flex-col justify-between h-full">
              {/* Title */}
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-green-700">
                  {product.title}
                </h2>
              </div>
              <div className="mb-6">
              <p>{truncateText(product.description, 200)}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                {/* Price */}
                <div className="text-xl font-semibold">
                ₹ {product.price}
                </div>
                <Link to={`/marketorder/${product.id}`}>
                  <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productcard;
