import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import React from "react";
import BookDetail from "./BookDetail";
import {createMemoryHistory} from 'history';

describe('BookDetail', () => {
    it('should show book name', function () {
        const history = createMemoryHistory();
        history.push('book-details/1');
        const { getByText } = render(<MemoryRouter initialEntries={["/books/1"]}>
            <Routes>
                <Route path="/books/:id" element={<BookDetail/>}></Route>
            </Routes>
        </MemoryRouter>);

        expect(getByText('Book detail with id 1')).toBeInTheDocument();
    });
})