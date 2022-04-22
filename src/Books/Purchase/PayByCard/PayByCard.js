import React, { useState, useEffect } from "react";
import "./PayByCard.css";
import CreditCard from "../../../CommonComponents/CreditCard/CreditCard";
import PurchaseService from "../Purchase.service";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function PayByCard(props) {
  const [orderDetails, setOrderDetails] = useState({
    bookName: props?.orderDetails?.bookName || "",
    amount: props?.orderDetails?.amount || 0,
    currency: props?.orderDetails?.currency || "",
    showOrderDetails: props?.orderDetails?.showOrderDetails,
  });

  const [isErrorOccured, setIsErrorOccured] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showOrderMessage, setShowOrderMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const orderDetails = sessionStorage.getItem("orderedData");
    const parsedOrderedDetails = JSON.parse(orderDetails);
    if (parsedOrderedDetails) {
      setOrderDetails({ ...parsedOrderedDetails, showOrderDetails: true });
    }
  }, []);

  const makePayment = async (data) => {
    try {
      setIsErrorOccured(false);
      setShowLoader(true);
      const paymentData = {
        creditCardNumber: data.number,
        creditCardExpiration: data.expiry,
        cardSecurityCode: data.cvv,
        cardHolderName: data.name,
        amount: orderDetails.amount,
        orderId: orderDetails.id,
      };
      const responseData = await PurchaseService.makePaymentForOrder(
        paymentData
      );
      if (!responseData.status) {
        setErrorMessage(responseData.message);
        setIsErrorOccured(true);
      } else {
        setShowOrderDetails(true);
        setShowOrderMessage(
          responseData.message ||
            `Your order placed successfully with ID - ${orderDetails.id}.`
        );
      }
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      setIsErrorOccured(true);
    }
  };

  return (
    <div>
      {showLoader && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showLoader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {showOrderDetails && (
        <div className="order-confirmed">
          <div>{showOrderMessage}</div>
          <div>
            <Button variant="contained" onClick={() => navigate(`/`)}>
              Go To Home Page
            </Button>
          </div>
        </div>
      )}

      {!showOrderDetails && (
        <div className="purchase-card-container">
          {isErrorOccured ? (
            <div className="error-occurred">{errorMessage}</div>
          ) : (
            ""
          )}
          {orderDetails.showOrderDetails ? (
            <div>
              <div>
                Please do a payment of {orderDetails.currency}{" "}
                {orderDetails.amount} for the ordering of the book{" "}
                <strong> {orderDetails.bookName} </strong>.
              </div>
            </div>
          ) : (
            ""
          )}
          {!showOrderDetails ? (
            <div>
              <CreditCard makePayment={makePayment} />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default PayByCard;
