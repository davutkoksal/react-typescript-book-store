import React, { useEffect, useState } from 'react'
import BookItem from '../components/BookItem';

const Homepage = () => {
  const [bookList, setBookList] = useState([])

    const getData = async () => {
      const response = await fetch("http://localhost:3001/api/book?page=1");
      const data = await response.json();
      setBookList(data.data);
    };

    useEffect(() => {
      getData();
    }, []);


  return (
    <div className='p-5'>{bookList.map((item:any)=><BookItem bookprops={item}/>)}</div>
  )
}

export default Homepage