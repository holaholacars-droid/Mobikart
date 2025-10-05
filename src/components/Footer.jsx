import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="w-full bg-black font-mono flex flex-row justify-evenly p-14 text-zinc-500 transition-transform duration-500 ease-in-out">
        <main className="flex-grow">
          <footer className="w-full h-auto bg-black font-mono flex flex-row justify-evenly p-14 text-zinc-500">
            <div className="space-y-2">
              <h2 className="text-white">Company</h2>
              <ul className="space-y-2 text-[13px]">
                <li>
                  <a href="">STORE</a>
                </li>
                <li className="bg-gradient-to-r from-sky-800 to-sky-500 bg-clip-text text-transparent">
                  <a href="">SPECIAL SERIES PHONES</a>
                </li>
                <Link to='aboutus'>
                  <li>
                    <a href="">ABOUT US</a>
                  </li>
                </Link>
              </ul>
            </div>
            <div>
              <h2 className="text-white">Reach Us</h2>
              <ul>
                <p>MobiKart</p>
                <p>Gaffar Market, Karol Bagh</p>
                <div className="flex flex-row">
                  <div>
                    <p className="py-2">Sales:</p>
                    <p>Kuldeep Kumar</p>
                    <p>+91 9953129651</p>
                  </div>
                </div>
              </ul>
            </div>
            <div>
              <h1 className="text-white">
                We are on a mission to make smartphone more suitable
              </h1>
            </div>
          </footer>
          <div className="flex items-center justify-center font-mono">
            <p className="text-white text-center py-2">
              Made with ❤️ in Bharat
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

export default Footer;
