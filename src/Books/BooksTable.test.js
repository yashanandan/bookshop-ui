import React from "react";
import {render} from '@testing-library/react'
import BooksTable from "./BooksTable";
import booksFactory from "./__factory__/books-factory";

describe('BooksTable', () => {
    it('should display only headers when there are no rows', function () {
        const { getByText } = render(<BooksTable books={[{}]}/>);

        expect(getByText('Title')).toBeTruthy();
        expect(getByText('Author')).toBeTruthy();
        expect(getByText('Price')).toBeTruthy();
    });

    it('should display single book when there is a book', function () {
        const { getByText } = render(<BooksTable books={[booksFactory()[0]]}/>);

        expect(getByText('Malcom Gladwell')).toBeTruthy();
        expect(getByText('Outliers')).toBeTruthy();
        expect(getByText('INR 200')).toBeTruthy();
    });

    it('should display multiple rowhen there is a book', function () {
        const { getByText } = render(<BooksTable books={booksFactory()}/>);

        expect(getByText('Malcom Gladwell')).toBeTruthy();
        expect(getByText('J K Rowling')).toBeTruthy();
    });
})