import React from "react";
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import "./NewAddress.css";

function NewAddress(props) {
  const {
    register: address,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const orderBook = (data) => {
    const orderDetails = {
      recipientName: data.recipientName,
      address: {
        lineNoOne: data.lineNoOne,
        lineNoTwo: data.lineNoTwo,
        city: data.city,
        state: data.state,
        pinCode: data.pincode,
        country: data.country,
      },
      bookId: props.bookId,
      quantity: data.quantity,
    };
    props.address(orderDetails);
  };


  //api call using the id to load book data
  return (
    <div>
      <form onSubmit={handleSubmit(orderBook)} className="my-form">
        <div className="form-item">
          <label htmlFor="recipientName">Recipent name:*</label>
          <input {...address("recipientName", { required: true })} placeholder="Recipient Name" />
          {errors.recipientName && errors.recipientName.type === "required" && (
            <span>This is required</span>
          )}
        </div>
        <div className="form-item">
          <label htmlFor="lineNoOne">Address Line 1:*</label>
          <input {...address("lineNoOne", { required: true })}   placeholder="Address Line 1" />
          {errors.lineNoOne && errors.lineNoOne.type === "required" && (
            <span>This is required</span>
          )}
        </div>
        <div className="form-item">
          <label htmlFor="lineNoTwo">Address Line 2:</label>
          <input {...address("lineNoTwo", { required: true })} placeholder="Address Line 2" />
        </div>
        <div className="form-item">
          <label htmlFor="city">City:*</label>
          <input {...address("city", { required: true })} placeholder="City" />
          {errors.city && errors.city.type === "required" && (
            <span>This is required</span>
          )}
        </div>

        <div className="form-item">
          <label htmlFor="city">State:*</label>
          <input {...address("state", { required: true })} placeholder="State" />
          {errors.state && errors.state.type === "required" && (
            <span>This is required</span>
          )}
        </div>

        <div className="form-item">
          <label htmlFor="city">Pincode:*</label>
          <input {...address("pincode", { required: true })} placeholder="Pincode" />
          {errors.pincode && errors.pincode.type === "required" && (
            <span>This is required</span>
          )}
        </div>

        <div className="form-item">
          <label htmlFor="city">Country:*</label>
          <input {...address("country", { required: true })} placeholder="Country" />
          {errors.country && errors.country.type === "required" && (
            <span>This is required</span>
          )}
        </div>

        <div className="form-item">
          <label htmlFor="city">Quatity:*</label>
          <input {...address("quantity", { required: true })} type="number" placeholder="Quantity" />
          {errors.quantity && errors.quantity.type === "required" && (
            <span>This is required</span>
          )}
        </div>

        <Button variant="contained" type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default NewAddress;
