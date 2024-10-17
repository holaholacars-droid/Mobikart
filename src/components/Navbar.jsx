import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ClerkProvider, SignIn } from "@clerk/clerk-react";
import { SignedOut } from "@clerk/clerk-react";
import { SignedIn } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, PenBox } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

function Navbar() {
  const [showsignin, setshowsignin] = useState(false);
  const { user } = useUser();
  const [search, setsearch] = useSearchParams();

  useEffect(() => {
    if (search.get("sign-in")) {
      setshowsignin(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setshowsignin(false);
      setsearch({});
    }
  };

  return (
    <>
      <nav className="h-16 w-full flex justify-between bg-black items-center fixed font-mono px-4">
        <Link to="/">
          <div className="text-green-700 font-bold pl-3 text-lg hover:cursor-pointer">
            MobiKart
          </div>
        </Link>
        <ul className="md:flex hidden font-semibold text-green-500">
          <Link to="/">
            <li className="mx-[10px] cursor-pointer">Home</li>
          </Link>
          <Link to="marketplace">
            <li className="mx-[10px] cursor-pointer">MarketPlace</li>
          </Link>
          <Link to="myorders">
            <li className="mx-[10px] cursor-pointer">My Order</li>
          </Link>
        </ul>

        <div className="flex text-white gap-8">
          <SignedOut>
            <Button onClick={() => setshowsignin(true)}>Login</Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "Seller" && (
              <Link to="/postproduct">
                <Button variant="destructive" className="rounded-full">
                  Add Product
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Order"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/myorder"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showsignin && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-opacity-30"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/marketplace"
            fallbackRedirectUrl="/marketplace"
          />
        </div>
      )}
    </>
  );
}

export default Navbar;
