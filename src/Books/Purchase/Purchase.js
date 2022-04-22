import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PurchaseAddress from "./PurchaseAddress/PurchaseAddress";
import PurchaseService from "./Purchase.service";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import "./Purchase.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Purchase() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [bookName, setBookName] = React.useState("");
  const [isErrorOccured, setIsErrorOccured] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(false);
  const [orderDetails, setOrderDetails] = React.useState({
    id: 0,
    amount: 0,
    quantity: 0,
    currency: '',
    paymentMode: ''
  });
  const [showOrderDetails, setShowOrderDetails] = React.useState(false);

  useEffect(() => {
    const bookName = sessionStorage.getItem("bookName");
    setBookName(bookName);
  }, []);

  const orderBook = async (orderDetails) => {
    try {
      setShowLoader(true);
      setIsErrorOccured(false);
      const orderedData = await PurchaseService.orderBook(orderDetails);
      setOrderDetails({
          id: orderedData.id,
          amount: orderedData.amount,
          quantity: orderedData.quantity,
          currency: orderedData.book?.price?.currency || 'INR',
          paymentMode: orderedData.paymentMode
      });
      if (orderedData.paymentMode === 'CARD') {
        sessionStorage.setItem('orderedData', JSON.stringify(
          {
            id: orderedData.id,
            bookName: orderedData.book.name,
            amount: orderedData.amount,
            quantity: orderedData.quantity,
            currency: orderedData.book?.price?.currency || 'INR',
            paymentMode: orderedData.paymentMode
        }
        ));
        navigate(`/pay/orders/${orderedData.id}`);
      }
      setShowOrderDetails(true);
    } catch (error) {
      setIsErrorOccured(true);
    } finally {
      setShowLoader(false);
    }
  };

  //api call using the id to load book data
  return (
    <div className="purchase-book-container">
       {showLoader && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showLoader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {!showOrderDetails && (
        <div>
          Purchase the book <strong>{bookName}</strong>
        </div>
      )}
      {isErrorOccured && (
        <div className="error-occurred">
          Out Of Stock. Please try again later
        </div>
      )}

      {showOrderDetails && (
        <div className="order-confirmed">
          <div>Your order placed successfully with ID - {orderDetails.id}</div>
          <div>Please pay <strong> {orderDetails.currency} {orderDetails.amount} </strong> amount on delivery</div>
          <div>
            <Button variant="contained" onClick={() => navigate(`/`)}>Go To Home Page</Button>
          </div>
        </div>
      )}

      {!showOrderDetails && (
        <div className="purchase-address-container">
          <PurchaseAddress bookId={id} address={orderBook} />
        </div>
      )}
    </div>
  );
}

export default Purchase;
