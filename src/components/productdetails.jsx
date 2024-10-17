import { getSingleProduct, updateproductstaus } from "@/api/apiproduct";
import useFetch from "@/hook/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { DoorClosed, DoorOpen } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import OrdersCard from "./OrdersCard";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@radix-ui/react-select";

function MyOrder() {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    loading: loadingProduct,
    data: product,
    fn: fnProduct,
  } = useFetch(getSingleProduct, {
    product_id: id,
  });

  const { loading: loadingstockstatus, fn: fnstockstatus } = useFetch(
    updateproductstaus,
    {
      product_id: id,
    }
  );

  const handlestatuschange = (value) => {
    const instock = value === "open";
    fnstockstatus(instock).then(() => fnProduct());
  };

  useEffect(() => {
    if (isLoaded) fnProduct();
  }, [isLoaded]);

  useEffect(() => {
    console.log(product);
  });

  return (
    <div className="flex flex-col pt-24 pl-4 space-x-9 space-y-8 font-mono pr-4">
      <div className="text-white">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {product?.title}
        </h1>
      </div>
      <img
        src={product?.image}
        className="h-[20%] w-[20%] mt-9 rounded-2xl"
        alt={product?.title}
      />
      <div className="text-white text-xl">
        <p>Price: ₹ {product?.price}</p>
      </div>
      <div>
        <p className="text-white">Description : {product?.description}</p>
      </div>
      <div className="text-white">
        {product?.instock ? <>In Stock</> : <>Out of Stock</>}

        {product?.seller_id === user?.id && (
          <Select onValueChange={handlestatuschange}>
            <SelectTrigger
              className={`w-full p-2 border rounded-md text-white ${
                product?.instock ? "bg-green-600" : "bg-red-800"
              }`}
            >
              <SelectValue
                placeholder={`Product Status: ${
                  product?.instock ? "In Stock" : "Out of Stock"
                }`}
              />
            </SelectTrigger>
            <select className="p-2 border rounded-md bg-gray-800 text-white" onChange={(e) => handlestatuschange(e.target.value)}>
              <option value="open">In Stock</option>
              <option value="closed">Out of Stock</option>
            </select>
          </Select>
        )}
        <div className="pt-5 w-full">
        {product?.seller_id !== user?.id && product?.instock && (
          <Link to={`/checkout/${product?.id}`}>
            <Button className="w-full" product={product} user={user} fetchproduct={fnProduct}>
              Buy Now
            </Button>
          </Link>
        )}
        </div>
      </div>

      {
        product?.orders?.length > 0 && product?.seller_id === user?.id && (
          <div>
            <h2 className="text-white text-2xl">Orders</h2>
            {
              product?.orders.map((order) => {
                return <OrdersCard key={order.id} order={order}/>
              })}
          </div>
        )
      }
    </div>
  );
}

export default MyOrder;
