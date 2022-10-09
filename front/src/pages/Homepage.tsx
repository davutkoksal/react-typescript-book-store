import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookItem from "../components/BookItem";
import CustomButton from "../components/CustomButton";
import { getAllBooksList } from "../store";

const Homepage = () => {
  const [pageCount, setPageCount] = useState(2);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const allBooksList = useSelector((state: any) => state.cart.allBooksList);
  const totalBookCount = useSelector((state: any) => state.cart.totalBookCount);
  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/book?page=1");
      const data = await response.json();
      dispatch(getAllBooksList(data));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const response = await fetch(
      `http://localhost:3001/api/book?page=${pageCount}`
    );
    const data = await response.json();
    dispatch(getAllBooksList(data));
    setPageCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (allBooksList.length === 0) {
      getData();
    }
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center text-[30px] font-bold mt-[50px]">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-5">
      {allBooksList.map((item: any) => (
        <BookItem key={item.id} bookprops={item} />
      ))}
      {totalBookCount > allBooksList.length && (
        <div className="flex justify-end">
          <CustomButton
            onClick={() => handleLoadMore()}
            title="Load More Books"
            className="bg-[#8417B4]"
          />
        </div>
      )}
    </div>
  );
};

export default Homepage;
