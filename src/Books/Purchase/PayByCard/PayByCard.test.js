import React from "react";
import { render } from '@testing-library/react'
import PayByCard from './PayByCard';
import { MemoryRouter } from "react-router-dom";

describe('Pay By Card', () => {
    it('should show order details', async function () {
        const orderDetails = {
            bookName: "The Eagle Fly",
            amount: 300,
            currency: "INR",
            showOrderDetails: true
        };
        const { getByText } = render(<MemoryRouter><PayByCard orderDetails={orderDetails}/></MemoryRouter>);
        expect(getByText(/The Eagle Fly/i)).toBeInTheDocument();
        expect(getByText(/300/i)).toBeInTheDocument();
        expect(getByText(/INR/i)).toBeInTheDocument();
    });
})