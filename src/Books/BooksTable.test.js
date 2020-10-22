import React from "react";
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import BooksTable from "./BooksTable";

describe('BooksTable', () => {
    it('should display only headers when there are no rows', function () {
        const books = [{name: "Malcom Gladwell", title: "Outliers", price: 200}];
        const { getByText } = render(<BooksTable books={books}/>);

        expect(getByText('Name')).toBeTruthy();
        expect(getByText('Title')).toBeTruthy();
        expect(getByText('Price')).toBeTruthy();
    });
})