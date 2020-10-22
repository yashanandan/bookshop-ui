import React from "react";
import {render, waitForElement} from '@testing-library/react'
import ListBooksContainer from "./ListBooksContainer";
import BookModel from "./BookModel";
import BooksTable from "./BooksTable";

jest.mock('./BooksTable', () => {
    return jest.fn(() => null);
});

describe('ListBooks', () => {
    beforeEach(() => {
        BookModel.fetchAll = jest.fn().mockResolvedValue(books());
    });

    it('should fetch the books', function () {
        const { getByText, getByRole } = render(<ListBooksContainer/>);

        expect(BookModel.fetchAll).toHaveBeenCalled();
        waitForElement(() => {
            expect(BooksTable).toHaveBeenCalledWith(books());
        })
        // waitForElement(() => {
        //     expect(getByText('Malcom Gladwell')).toBeTruthy();
        //     expect(getByText('J K Rowling')).toBeTruthy();
        // })
    });

    function books() {
        return [{title: "Malcom Gladwell", author: "Outliers", price: 200},
            {title: "J K Rowling", author: "Harry Potter", price: 500}];
    }
})