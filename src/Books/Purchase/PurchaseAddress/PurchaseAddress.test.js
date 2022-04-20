import React from "react";
import {screen, render} from '@testing-library/react';
import PurchaseAddress from "./PurchaseAddress";

jest.mock('axios');

describe('New Address', () => {
    it('should show items on screen',  function () {
        render(<PurchaseAddress  bookId={1}/>);

        expect(screen.queryAllByPlaceholderText('Recipient Name')).toBeTruthy();
        expect(screen.queryAllByPlaceholderText('Address Line 1')).toBeTruthy();
        expect(screen.queryAllByPlaceholderText('Address Line 2')).toBeTruthy();
        expect(screen.queryAllByPlaceholderText('City')).toBeTruthy();
        expect(screen.queryAllByPlaceholderText('Country')).toBeTruthy();
        expect(screen.queryAllByPlaceholderText('Pincode')).toBeTruthy();
        expect(screen.queryAllByPlaceholderText('State')).toBeTruthy();
        expect(screen.queryAllByPlaceholderText('Quantity')).toBeTruthy();
    });

})