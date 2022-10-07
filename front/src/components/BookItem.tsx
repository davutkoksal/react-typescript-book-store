import React from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../store";
import CustomButton from "./CustomButton";

export interface BookProps {
  bookprops: { title: string; cover_url: string;author:string ;pages:string;id:string};
}
const BookItem = ({ bookprops }: BookProps) => {

 const dispatch=useDispatch()
    const handleAddToCart=(item:any)=>{
      console.log(333,item)
      dispatch(addBook(item))
    }
  return (
    <div className="h-[200px] rounded-[30px] bg-white mb-3 flex justify-between items-center px-10 py-5">
      <div className="w-[20%] flex justify-start items-center">
        <img className="w-[120px]" src={bookprops.cover_url} alt="book-cover" />
      </div>
      <div className="w-[60%]">
        <h2 className="font-bold text-2xl">{bookprops.title}</h2>
        <h6>
          <span className="font-bold">Author:</span> {bookprops.author}
        </h6>
        <h6>
          <span className="font-bold">Pages:</span>
          {bookprops.pages}
        </h6>
      </div>
      <div className="w-[20%] flex justify-center items-center">
        <CustomButton
          title="Add To Cart"
          onClick={() => handleAddToCart(bookprops)}
          className="bg-[#8417B4] text-white"
        />
      </div>
    </div>
  );
};

export default BookItem;
