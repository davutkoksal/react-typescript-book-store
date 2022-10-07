import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CustomButton from '../components/CustomButton';

const Cart = () => {
    const navigate = useNavigate();

    const booklist = useSelector((state: any) => state.cart.bookList);

  return (
    <div className="flex justify-center mx-auto items-center p-5">
      {booklist.length === 0 && (
        <div className="flex flex-col justify-center mx-auto items-center rounded-3xl text-30px font-bold bg-white h-[200px] w-[400px]">
          <p> You have no book in your Cart</p>
          <CustomButton
            title="Back To Home"
            onClick={() => navigate("/")}
            className="bg-[#8417B4] text-white mt-5"
          />
        </div>
      )}
      {booklist.length > 0 && (
        <div className="w-full">
          {booklist.map((item: any) => (
            <CartItem cartItemPorps={item} />
          ))}
          <div className='w-full flex justify-center items-center'>
            
          <CustomButton
            title="Order Summary"
            onClick={() => navigate("/order")}
            className="bg-[#8417B4] text-white mt-5"
          />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart