import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import "./PurchaseAddress.css";

function PurchaseAddress(props) {
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
      mobileNumber: data.mobileNumber,
      bookId: props.bookId,
      quantity: data.quantity,
      paymentMode: data.paymentMode
    };
    props.address(orderDetails);
  };

  //api call using the id to load book data
  return (
    <div>
      <form onSubmit={handleSubmit(orderBook)} className="my-form">
        <div className="form-item">
          <label htmlFor="recipientName">Recipent name:*</label>
          <input
            {...address("recipientName", { required: true })}
            placeholder="Recipient Name"
            type="text"
          />
          {errors.recipientName && errors.recipientName.type === "required" && (
            <span>This is required</span>
          )}
        </div>

        <div className="form-item mobile-number-input">
          <label htmlFor="mobileNumber">Mobile Number:*</label>
          <input
            {...address("mobileNumber", { required: true, minLength: 10, maxLength: 10 })}
            placeholder="9876543210"
            type="number"
          />
          {errors.mobileNumber && errors.mobileNumber.type === "required" && (
            <span>This is required</span>
          )}
           {errors.mobileNumber && (errors.mobileNumber.type === "minLength" || errors.mobileNumber.type === "maxLength") && (
            <span>Should be 10 digits</span>
          )}
        </div>

        <div className="form-item">
          <label htmlFor="lineNoOne">Address Line 1:*</label>
          <input
            {...address("lineNoOne", { required: true })}
            placeholder="Address Line 1"
            type="text"
          />
          {errors.lineNoOne && errors.lineNoOne.type === "required" && (
            <span>This is required</span>
          )}
        </div>
        <div className="form-item">
          <label htmlFor="lineNoTwo">Address Line 2:</label>
          <input
            {...address("lineNoTwo", { required: true })}
            placeholder="Address Line 2"
            type="text"
          />
        </div>
        <div className="form-item">
          <label htmlFor="city">City:*</label>
          <input
            {...address("city", { required: true })}
            placeholder="City"
            type="text"
          />
          {errors.city && errors.city.type === "required" && (
            <span>This is required</span>
          )}
        </div>

        <div className="form-item">
          <label htmlFor="state">State:*</label>
          <input
            {...address("state", { required: true })}
            placeholder="State"
            type="text"
          />
          {errors.state && errors.state.type === "required" && (
            <span>This is required</span>
          )}
        </div>

        <div className="form-item">
          <label htmlFor="Pincode">Pincode:*</label>
          <input
            {...address("pincode", { required: true })}
            placeholder="Pincode"
            type="text"
          />
          {errors.pincode && errors.pincode.type === "required" && (
            <span>This is required</span>
          )}
        </div>

        <div className="form-item">
          <label htmlFor="country">Country:*</label>
          <input
            {...address("country", { required: true })}
            placeholder="Country"
            type="text"
          />
          {errors.country && errors.country.type === "required" && (
            <span>This is required</span>
          )}
        </div>

        <div className="form-item">
          <label htmlFor="quantity">Quatity:* <span className="stocks-available"> (Available - {props.bookCount}) </span></label>
          <input
            {...address("quantity", { required: true, min: 1, max: props.bookCount })}
            type="number"
            placeholder="Quantity"
            pattern="[\d]"
            min={1}
            max={props.bookCount}
          />
          {errors.quantity && errors.quantity.type === "required" && (
            <span>This is required</span>
          )}
          {errors.quantity && errors.quantity.min && (
            <span>Minimum quantity should be 1</span>
          )}
        </div>
        <div className="form-item">
          <label htmlFor="PaymentMode">Payment Type:*</label>
          <div>
            <input type="radio" value="COD" name="paymentMode"  {...address("paymentMode", { required: true })} /> COD
            <input type="radio" value="CARD" name="paymentMode" {...address("paymentMode", { required: true })} /> Card
          </div>
        </div>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default PurchaseAddress;
