import React from "react";
import {render } from '@testing-library/react';
import CreditCard from './CreditCard'

import {
    formatCreditCardNumber,
    formatExpirationDate,
    formatCVV,
  } from "./CreditCardUtils";

describe('Credit Card test', function () {

    let getByText = '';
    let getByPlaceholderText = '';

    beforeEach(() => {
        ({ getByText, getByPlaceholderText } = render(<CreditCard/>));
    })
    it('should show credit card input', function () {
        expect(getByText('Card Number')).toBeInTheDocument();
        expect(getByPlaceholderText('Card Number')).toBeInTheDocument();
    });

    it('should show expiry input', function () {
        expect(getByText('Valid Thru')).toBeInTheDocument();
        expect(getByPlaceholderText('Valid Thru')).toBeInTheDocument();
    });

    it('should show cvv input', function () {
        expect(getByText('CVV')).toBeInTheDocument();
        expect(getByPlaceholderText('CVV')).toBeInTheDocument();
    });

    it('should show card holder input', function () {
        expect(getByText('Card Holder Name')).toBeInTheDocument();
        expect(getByPlaceholderText('Card Holder Name')).toBeInTheDocument();
    });

    it ('should show button', function() {
        expect(getByText('Submit')).toBeInTheDocument();
    })

    it ('should reset button', function() {
        expect(getByText('Reset')).toBeInTheDocument();
    })

    it ('should validate cvv', function() {
        expect(formatCVV('1234')).toBe('1234');
        expect(formatCVV('12345')).toBe('1234');
        expect(formatCVV('abcd')).toBe('');
    })


    it ('should validate expiry date', function() {
        expect(formatExpirationDate('122022')).toBe('12/2022');
        expect(formatExpirationDate('12/2022')).toBe('12/2022');
        expect(formatExpirationDate('abcd')).toBe('');
    })

    it ('should validate card number', function() {
        expect(formatCreditCardNumber('1234567890124563')).toBe('1234-5678-9012-4563');
        expect(formatCreditCardNumber('12345678901')).toBe('1234-5678-901');
        expect(formatCreditCardNumber('abcd')).toBe('');
    })
});