import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function Dashboard() {
  const [count, setCount] = useState(0);
  const { user } = useUser(false);
  

  return (
    <>
      <div className="bg-white">
        <div>
          <img
            className="w-full cover"
            src="https://miro.medium.com/v2/resize:fit:750/format:webp/1*f65plK1tMz_q2BVvu52Dtg.gif"
            alt=""
          />
        </div>
        {!user?.id>0 && (
          <>
          <div className="flex gap-6 justify-center">
          <Link to = 'onboard'>
            <Button variant="blue" size="xl">Buyer</Button>
          </Link>
          <Link to='onboard'>
          <Button variant="red" size="xl">Seller</Button>
          </Link>
        </div>
          </>
        )}
        <div className="w-full flex flex-wrap text-center font-mono justify-evenly">
          <div className="w-full flex flex-col text-center text-xl mt-6 mb-6">
            Products
          </div>
          <div className="w-full flex flex-wrap justify-between gap-1 p-12">
            <div className="h-auto w-1/4 p-4 flex flex-col items-center mb-12">
              <img
                className="h-40 w-44 rounded-xl cover"
                src="https://cdn.dribbble.com/users/954572/screenshots/16765275/apple-gif.gif"
                alt=""
              />
              <h2 className="p-2 font-bold">Iphones</h2>
              <p>
                Your one-stop shop for the latest iPhones at unbeatable prices.
              </p>
            </div>
            <div className="h-auto w-1/4 p-4 flex flex-col items-center mb-12">
              <img
                className="h-40 w-44 rounded-xl cover"
                src="https://customercarecontacts.com/wp-content/uploads/2021/02/471b4d258b5252eb1b121cabb7a87f60-1024x982.jpg"
                alt=""
              />
              <h2 className="p-2 font-bold">Realme</h2>
              <p>
                Discover the best deals on the latest Realme smartphones, all in
                one place
              </p>
            </div>
            <div className="h-auto w-1/4 p-4 flex flex-col items-center mb-12">
              <img
                className="h-40 w-44 rounded-xl cover"
                src="https://cdn.dribbble.com/users/986280/screenshots/3404605/dribbble_samsung-_loop_.gif"
                alt=""
              />
              <h2 className="p-2 font-bold">Samsung</h2>
              <p>
                Your one-stop shop for the latest iPhones at unbeatable prices.
              </p>
            </div>
            <div className="h-auto w-1/4 p-4 flex flex-col items-center mb-12">
              <img
                className="h-40 w-44 rounded-xl cover"
                src="https://vectorseek.com/wp-content/uploads/2021/01/Infinix-Logo-Vector-scaled.jpg"
                alt=""
              />
              <h2 className="p-2 font-bold">Infnix</h2>
              <p>
                Your one-stop shop for the latest iPhones at unbeatable prices.
              </p>
            </div>
            <div className="h-auto w-1/4 p-4 flex flex-col items-center mb-12">
              <img
                className="h-40 w-44 rounded-xl cover"
                src="https://www.phoneworld.com.pk/wp-content/uploads/2019/02/vivo-logo.jpg"
                alt=""
              />
              <h2 className="p-2 font-bold">Vivo</h2>
              <p>
                Your one-stop shop for the latest iPhones at unbeatable prices.
              </p>
            </div>
            <div className="h-auto w-1/4 p-4 flex flex-col items-center mb-12">
              <img
                className="h-40 w-44 rounded-xl cover"
                src="https://cdn.dribbble.com/users/2082408/screenshots/17866094/xia_drb.gif"
                alt=""
              />
              <h2 className="p-2 font-bold">Redmi</h2>
              <p>
                Your one-stop shop for the latest iPhones at unbeatable prices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
