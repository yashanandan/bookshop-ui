import React from "react";
import BookModel from "./BookModel";
import {render} from '@testing-library/react';
import booksFactory from "./__factory__/books-factory";
import { MemoryRouter } from "react-router-dom";
import axios from 'axios';
import Purchase from './Purchase';

jest.mock('axios');

describe('BookModel', () => {
    it('should fetch all books from api',  async () => {
        axios.get = jest.fn().mockResolvedValue({data: booksFactory()});
        const books = await BookModel.fetchAll();
        const url = "http://localhost:8080/api/orders";
        const headers = {"auth": {"password": "test", "username": "test2@book.com"}};
        expect(axios.post).toHaveBeenCalledWith(url, headers);
        expect(books).toHaveLength(2);
    });
})