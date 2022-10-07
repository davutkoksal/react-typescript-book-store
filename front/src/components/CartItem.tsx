import React from "react";
import { useDispatch } from "react-redux";
import {  removeBook } from "../store";
import CustomButton from "./CustomButton";

export interface CartItemPorps {
  cartItemPorps: {
    title: string;
    cover_url: string;
    author: string;
    pages: string;
    id: string;
    amount: string;
  };
}
const CartItem = ({ cartItemPorps }: CartItemPorps) => {
  const dispatch = useDispatch();
  const handleAddToCart = (item: any) => {
    dispatch(removeBook(item.id));
  };
  return (
    <div className="h-[200px] w-full rounded-[30px] bg-white mb-3 flex justify-between items-center px-10 py-5">
      <div className="w-[20%] flex justify-start items-center">
        <img className="w-[120px]" src={cartItemPorps.cover_url} alt="book-cover" />
      </div>
      <div className="w-[60%]">
        <h2 className="font-bold text-2xl">{cartItemPorps.title}</h2>
        <h6>
          <span className="font-bold">Author:</span> {cartItemPorps.author}
        </h6>
        <h6>
          <span className="font-bold">Pages:</span>
          {cartItemPorps.pages}
        </h6>
        <h6>
          <span className="font-bold">Quantity:</span>
          {cartItemPorps.amount}
        </h6>
      </div>
      <div className="w-[20%] flex justify-center items-center">
        <CustomButton
          title="Remove From Cart"
          onClick={() => handleAddToCart(cartItemPorps)}
          className="bg-red-500 text-white"
        />
      </div>
    </div>
  );
};

export default CartItem;
