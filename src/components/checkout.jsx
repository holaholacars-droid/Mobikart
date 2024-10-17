import React, { useEffect } from "react";
import useFetch from "@/hook/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { buyproduct } from "@/api/apiorders";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, { message: "Enter Your Name" }),
  email: z.string().email({ message: "Enter a valid email" }),
  phone: z.string().min(1, { message: "Enter Your Phone Number" }),
  address: z.string().min(1, { message: "Enter Your Address" }),
  payment: z.string().min(1, { message: "Enter Payment Mode" }),
});

function Checkout() {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    loading: loadingProduct,
    data: product,
    fn: fnProduct,
  } = useFetch(buyproduct, {
    product_id: id,
  });

  useEffect(() => {
    if (isLoaded && id) fnProduct();
  }, [isLoaded, id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmitForm = (data) => {
    fnProduct({
      ...data,
      order_id: product.id,
      buyer_id: user.id,
      status: "Pending",
    }).then(() => {
      alert("Order placed successfully!");
    }).catch((err) => {
      console.error(err);
      alert("Failed to place order.");
    });
  };

  if (loadingProduct) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found or failed to load.</p>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 pt-32">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Checkout
      </h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            placeholder="Your Full Name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="you@example.com"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone No
          </label>
          <input
            type="text"
            id="phone"
            {...register("phone")}
            placeholder="Enter Phone No with country code"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Shipping Address
          </label>
          <input
            type="text"
            id="address"
            {...register("address")}
            placeholder="Street Address, City, State, Zip Code"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        <div>
          <label htmlFor="payment" className="block text-sm font-medium text-gray-700">
            Payment Mode
          </label>
          <input
            type="text"
            id="payment"
            {...register("payment")}
            placeholder="Mode of Payment: COD or UPI"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.payment && <p className="text-red-500 text-sm">{errors.payment.message}</p>}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Order Summary
          </h3>
          <p className="text-gray-600">
            Product: <span className="font-bold">{product?.title}</span>
          </p>
          <p className="text-gray-600">
            Quantity: <span className="font-bold">1</span>
          </p>
          <p className="text-gray-600">
            Total Price: <span className="font-bold">₹ {product?.price}</span>
          </p>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
