import React, { useState } from "react";
import "./PayByCard.css"
import CreditCard from '../../../CommonComponents/CreditCard/CreditCard'

function PayByCard(props) {

    const [orderDetails, setOrderDetails] = useState({
        bookName: props?.orderDetails?.bookName || '',
        amount: props?.orderDetails?.amount || 0,
        currency: props?.orderDetails?.currency || '',
        showOrderDetails: props?.orderDetails?.showOrderDetails
    });

    return (
        <div className="purchase-card-container">
            { orderDetails.showOrderDetails ? (
            <div>
                <div>
                    Please do a payment of {orderDetails.currency} {orderDetails.amount} for the order {orderDetails.bookName}.
                </div>
            </div>
            ) : '' }
            <div>
                <CreditCard />
            </div>
        </div>
    )
}

export default PayByCard;