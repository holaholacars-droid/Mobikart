import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function Onboarding() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  const handleRole = async (role) => {
    try {
      await user.update({
        unsafeMetadata: { role },
      });
      navigate(role === "Seller" ? "/postproduct" : "/marketplace");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user.unsafeMetadata.role === "Seller" ? "/postproduct" : "/marketplace"
      );
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="flex mt-36 gradient-title text-white font-extrabold text-7xl sm:text-8xl -tracking-tighter">
        I am a ....
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className="h-36 text-2xl"
          onClick={() => handleRole("Buyer")}
        >
          Buyer
        </Button>
        <Button
          variant="red"
          className="h-36 text-2xl"
          onClick={() => handleRole("Seller")}
        >
          Seller
        </Button>
      </div>
    </div>
  );
}

export default Onboarding;
