import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";

const Navbar = () => {
  const navigate = useNavigate();
  const booklist=useSelector((state:any)=>state.cart.bookList)

  return (
    <div className="bg-[#3A80F2] w-full flex justify-center items-center h-[80px] ">
      <h1 onClick={() => navigate("/")} className="text-[30px] font-bold cursor-pointer">
        Book Store
      </h1>

      <div className="absolute right-6 bg-slate-400 flex justify-center items-center rounded-lg px-3">
        <CustomButton
          title="My Cart"
          onClick={() => navigate("/cart")}
          className="bg-slate-400 text-white"
        />
        <div className="w-[25px] h-[25px] rounded-full bg-white flex justify-center items-center ">
          {booklist.length}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
