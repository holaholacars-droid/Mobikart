import { getproduct } from "@/api/apiproduct";
import useFetch from "@/hook/use-fetch";
import { useSession, useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import Productcard from "./Productcard";

function MarketPlace() {
  const { isLoaded } = useUser();

  const {
    fn: fnProduct,
    data: mobilesname,
    loading: loadingProduct,
  } = useFetch(getproduct, {});

  console.log(mobilesname);

  useEffect(() => {
    if (isLoaded) fnProduct();
  }, [isLoaded]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8 pt-20 text-white">
        All Phone
      </h1>
      {loadingProduct && (
         <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingProduct === false && (
        <div>
            <div>
                {mobilesname?.length ?(
                    mobilesname.map((product)=>{
                        return <Productcard key={product.id} product={product}/>
                    })
                ): (
                    <div>Out Of Stocks</div>
                )}
            </div>
        </div>
      )}
    </div>
  );
}

export default MarketPlace;
