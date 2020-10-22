import BookModel from "./BookModel";
import booksFactory from "./__test__/books-factory";
import axios from 'axios';

jest.mock('axios');

describe('BookModel', () => {
    it('should fetch all books from api',  async () => {
        axios.get = jest.fn().mockResolvedValue(booksFactory());
        const books = await BookModel.fetchAll();
        expect(axios.get).toHaveBeenCalledWith('/books');
        expect(books).toHaveLength(2);
    });
})

