import React from "react";

function Aboutus() {
  return (
    <>
      <div className="pt-[10%]">
        <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center hover:text-green-700 text-white">
          About Us</h1>
        <div className="flex justify-center pl-28 pr-28 pt-14 gap-24 text-white font-mono text-xl">
            <div>
                <img className="h-72 rounded-2xl pb-5" src="https://scontent.fdel31-1.fna.fbcdn.net/v/t1.18169-9/14441041_1134527336638147_8179438095092498747_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=4ZOTnKhC-fMQ7kNvgFMGFYn&_nc_zt=23&_nc_ht=scontent.fdel31-1.fna&oh=00_AYC9fhFPC_tJJxTekAGhj8-UVOjisj425ol1CGpOaq13uQ&oe=6738BBA2"/>
                <h1>Kuldeep Kumar</h1>
                <h1>Owner</h1>
            </div>
            <div>
                <img className="h-72 rounded-2xl pb-5" src="https://scontent.fdel31-1.fna.fbcdn.net/v/t39.30808-6/463402643_584959093890783_3455549526193579576_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=8-Hh0R-3NZ4Q7kNvgFkI1SW&_nc_zt=23&_nc_ht=scontent.fdel31-1.fna&_nc_gid=Aecdp2UnQ8zuxDUKdD8mAMF&oh=00_AYDgN5RjISkf8lqB1L_mkOmIsQvjOVNgj71P857DHpdpxw&oe=6717078A"/>
                <h1>Sachin Vardhan</h1>
                <h1>Developer</h1>
            </div>
        </div>
      </div>
    </>
  );
}

export default Aboutus;
