import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import "./CreditCard.css";
import Button from "@mui/material/Button";

import {
  formatCreditCardNumber,
  formatExpirationDate,
  formatCVV,
} from "./CreditCardUtils";

function CreditCard(props) {

  const [errors, setErrors] = useState({});

  const onSubmit = (data) => {
    let errors = {};
    if (!data.number) {
      errors = {...errors, ...{ number: { type: 'required'}}};
    }
    if (!data.expiry) {
      errors = {...errors, ...{ expiry: { type: 'required'}}};
    }
    if (!data.cvv) {
      errors = {...errors, ...{ cvv: { type: 'required'}}};
    }
    if (!data.name) {
      errors = {...errors, ...{ name: { type: 'required'}}};
    }

    setErrors(errors);

    if (!Object.keys(errors).length)  {
      props.makePayment(data);
    }
  };


  return (
    <Form
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        form
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <label htmlFor="email-text">Card Number*</label>
              <Field
                name="number"
                component="input"
                type="text"
                pattern="[\d|-]{16, 17}"
                placeholder="Card Number"
                format={formatCreditCardNumber}
              />
              {errors.number && errors.number.type === "required" && (
                <span>This is required</span>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="email-text">Card Holder Name*</label>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Card Holder Name"
              />
              {errors.name && errors.name.type === "required" && (
                <span>This is required</span>
              )}
            </div>
            <div className="card-exp-cvv">
              <div className="form-input">
                <label htmlFor="email-text">Valid Thru*</label>
                <Field
                  name="expiry"
                  component="input"
                  type="text"
                  pattern="\d\d/\d\d\d\d"
                  placeholder="Valid Thru"
                  format={formatExpirationDate}
                />
                {errors.expiry && errors.expiry.type === "required" && (
                  <span>This is required</span>
                )}
              </div>
              <div className="form-input">
                <label htmlFor="email-text">CVV*</label>
                <Field
                  name="cvv"
                  component="input"
                  type="text"
                  pattern="\d{3}"
                  placeholder="CVV"
                  format={formatCVV}
                />
                {errors.cvv && errors.cvv.type === "required" && (
                  <span>This is required</span>
                )}
              </div>
            </div>
            <div className="buttons">
              <Button type="submit" variant="contained">
                Submit
              </Button>
              <Button variant="outlined" onClick={form.reset}>
                Reset
              </Button>
            </div>
          </form>
        );
      }}
    />
  );
}

export default CreditCard;
