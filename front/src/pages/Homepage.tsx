import React, { useEffect, useState } from "react";
import BookItem from "../components/BookItem";
import CustomButton from "../components/CustomButton";

const Homepage = () => {
  const [bookList, setBookList] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(2);
  const [totalBookCount, setTotalBookCount] = useState(0);
  const getData = async () => {
    const response = await fetch("http://localhost:3001/api/book?page=1");
    const data = await response.json();
    setBookList(data?.data);
    setTotalBookCount(data?.metadata?.total_records);
  };

  const handleLoadMore = async () => {
    const response = await fetch(
      `http://localhost:3001/api/book?page=${pageCount}`
    );
    const data = await response.json();
    setBookList([...bookList, ...data.data]);
    setPageCount((prev) => prev + 1);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-5">
      {bookList.map((item: any) => (
        <BookItem key={item.id} bookprops={item} />
      ))}
      {totalBookCount > bookList.length && (
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
