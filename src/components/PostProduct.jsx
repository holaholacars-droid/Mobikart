import useFetch from "@/hook/use-fetch";
import { Description } from "@radix-ui/react-dialog";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { addNewJob, getproduct } from "@/api/apiproduct";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";
import { data } from "autoprefixer";
import { BarLoader } from "react-spinners";


const schema = z.object({
  title: z.string().min(1, { message: "Product name Required" }),
  description: z.string().min(1, { message: "Description is Required" }),
  image: z.string().min(1, { message: "image url of the product" }),
  price: z.string().min(1, { message: "price of the product" }),
});


const PostJob = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleClicks = () => {
    setTimeout(() => {
      window.location.reload(); // Refresh the page after 2 seconds
    }, 2000);
  };


  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJob,
    fn: fnCreateJob,
  } = useFetch(addNewJob);

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      seller_id: user.id,
      instock: true,
    });
  };

  useEffect(() => {
    if (dataCreateJob?.length > 0){
      setTimeout(() => {
        window.location.reload(); // Refresh the page after 2 seconds
      }, 2000);
    }
  }, [loadingCreateJob]);

  const {
    loading: loadingCompanies,
    data: mobilesname,
    fn: fnCompanies,
  } = useFetch(getproduct);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingCompanies) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  if (user?.unsafeMetadata?.role !== "Seller") {
    return <Navigate to="/marketplace" />;
  }
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8 pt-16 text-green-600">
        Add a Product
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4 pb-0"
      >
        <Input
          className="h-14"
          placeholder="Enter Product Name"
          {...register("title")}
        ></Input>
        {errors.title && <p className="text-red-900">{errors.title.message}</p>}
        <Textarea
          placeholder="Enter Product Description"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-900">{errors.description.message}</p>
        )}
        <Input
          className="h-14"
          placeholder="Enter Image Url"
          {...register("image")}
        ></Input>
        {/* {errors.image.message && <p className="text-red-800">{errors.image.message}</p>} */}
        <Input
          className="h-14"
          placeholder="Enter Product Price"
          {...register("price")}
        ></Input>
        {loadingCompanies && handleClicks && <BarLoader width={"100%"}/>}

        <Button onClick={handleClicks} type="submit" variant="blue" className="mt-2 bg-green-600 text-xl">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PostJob;
