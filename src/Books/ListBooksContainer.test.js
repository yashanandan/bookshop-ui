import React from "react";
import { render, waitFor } from '@testing-library/react'
import ListBooksContainer from "./ListBooksContainer";
import BookModel from "./BookModel";
import booksFactory from "./__factory__/books-factory";

describe('ListBooks', () => {
    beforeEach(() => {
        BookModel.fetchAll = jest.fn().mockResolvedValue(booksFactory());
    });

    it('should fetch the books', async function () {
        const { getByText } = render(<ListBooksContainer/>);

        await waitFor(() => {
            expect(BookModel.fetchAll).toHaveBeenCalled();
            expect(getByText('Malcom Gladwell')).toBeInTheDocument();
        })
    });
})