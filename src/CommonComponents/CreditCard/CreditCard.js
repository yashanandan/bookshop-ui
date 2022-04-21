import React from "react";
import { Form, Field } from "react-final-form";
import "./CreditCard.css";
import Button from '@mui/material/Button';

import {
  formatCreditCardNumber,
  formatExpirationDate,
  formatCVV,
} from "./CreditCardUtils";

const onSubmit = (data) => {
  console.log("Data ", data);
};

function CreditCard() {
  return (
    <Form
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        form,
        submitting,
        pristine,
        values,
        active,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <label htmlFor="email-text">Card Number</label>
              <Field
                name="number"
                component="input"
                type="text"
                pattern="[\d|-]{16,22}"
                placeholder="Card Number"
                format={formatCreditCardNumber}
              />
            </div>
            <div className="form-input">
              <label htmlFor="email-text">Card Holder Name</label>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Card Holder Name"
              />
            </div>
            <div className="card-exp-cvv">
              <div className="form-input">
                <label htmlFor="email-text">Valid Thru</label>
                <Field
                  name="expiry"
                  component="input"
                  type="text"
                  pattern="\d\d/\d\d"
                  placeholder="Valid Thru"
                  format={formatExpirationDate}
                />
              </div>
              <div className="form-input">
                <label htmlFor="email-text">CVV</label>
                <Field
                  name="cvv"
                  component="input"
                  type="text"
                  pattern="\d{3,4}"
                  placeholder="CVV"
                  format={formatCVV}
                />
              </div>
            </div>
            <div className="buttons">
              <Button type="submit" variant="contained" >Submit</Button>
              <Button variant="outlined"  onClick={form.reset}>Reset</Button>
            </div>
          </form>
        );
      }}
    />
  );
}

export default CreditCard;
