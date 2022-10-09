import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const OrderFormSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(4, "First Name must be at least 4 characters!")
    .max(50, "First Name must be max 50 characters!")
    .required("Please enter your first name"),
  last_name: Yup.string()
    .min(5, "Last Name must be at least 5 characters!")
    .max(50, "Last Name must be max 50 characters!")
    .required("Please enter your last name"),
  city: Yup.string().required("Please enter your city"),
  zip_code: Yup.string()
    .matches(/\d{2}-\d{3}/, "Is not in correct format")
    .required("Please enter your postal code"),
});
const OrderForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const booklist = useSelector((state: any) => state.cart.bookList);

  const handleFormSubmit = async (values: any) => {
    let orderList = booklist.map((item: any) => ({
      id: item.id,
      quantity: item.amount,
    }));
    const postData = {
      order: orderList,
      ...values,
    };
    if (orderList.length > 0) {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/order",
          postData
        );
        if (response.status === 201) {
          setModalMessage("Your Order Successfully Created");
          setShowModal(true);
        }
      } catch (error) {
        setModalMessage("Something went wrong!Please try again later!");
        setShowModal(true);
      }
    } else {
      setModalMessage("You have no books in your cart.Please add some!");
      setShowModal(true);
    }
  };
  return (
    <div className="flex justify-between flex-wrap">
      <div className="mb-1 bg-white p-3 rounded-xl w-[100%] sm:w-[38%] shadow-lg">
        <h4 className="font-bold text-sm text-center bg-slate-200 p-2 mb-2 rounded-lg">
          My Orders
        </h4>
        {booklist.map((item: any) => (
          <div key={item.id} className="flex mb-1">
            <div className="mr-2">
              <img
                className="max-w-[60px]"
                src={item.cover_url}
                alt="book-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-sm">{item.title}</h4>
              <h6>
                <span className="font-bold text-sm">Quantity:</span>
                {item.amount}
              </h6>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white px-3 py-5 rounded-xl w-[100%] sm:w-[60%] h-[490px] sm:h-[280px] shadow-lg">
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            city: "",
            zip_code: "",
          }}
          validationSchema={OrderFormSchema}
          onSubmit={async (values) => {
            handleFormSubmit(values);
          }}
        >
          <Form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label htmlFor="first_name">First Name</label>
                <Field
                  className="formInput"
                  id="first_name"
                  name="first_name"
                />
                <ErrorMessage
                  className="errorMessage"
                  name="first_name"
                  component="div"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="last_name">Last Name</label>
                <Field className="formInput" id="last_name" name="last_name" />
                <ErrorMessage
                  className="errorMessage"
                  name="last_name"
                  component="div"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              <div className="flex flex-col">
                <label htmlFor="city">City</label>
                <Field className="formInput" id="city" name="city" />
                <ErrorMessage
                  className="errorMessage"
                  name="city"
                  component="div"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="city">Postal Code</label>
                <Field
                  className="formInput"
                  id="zip_code"
                  name="zip_code"
                  placeholder="Ex:06-680"
                />
                <ErrorMessage
                  className="errorMessage"
                  name="zip_code"
                  component="div"
                />
              </div>
            </div>
            <div className="flex justify-center items-center mt-5">
              <button
                className="h-[40px] rounded-lg px-6 py-3 flex justify-center items-center bg-[#8417B4] text-white"
                type="submit"
              >
                I ORDER AND PAY
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      {showModal && (
        <div className="customModal">
          <div className="bg-white w-[50%] h-[200px] rounded-3xl flex flex-col justify-center items-center">
            <p>{modalMessage}</p>
            <div className="flex justify-center items-center mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="h-[40px] rounded-lg px-6 py-3 flex justify-center items-center bg-[#8417B4] text-white"
                type="submit"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
