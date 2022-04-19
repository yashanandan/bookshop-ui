import axios from 'axios';
import runtimeEnv from '@mars/heroku-js-runtime-env';

export default class BookModel {
    constructor(args) {
        this._id = args.id;
        this._title = args.name;
        this._author = {name: args.authorName};
        this._price = args.price;
    }

    static fetchAll = async (bookOrAuthorName = '') => {
        const env = runtimeEnv();
        console.log('env ', env.REACT_BOOK_SHOP)
        const baseUrl = env.REACT_BOOK_SHOP || 'http://localhost:8080';
        console.log('baseUrl ', baseUrl);
        const url = `${baseUrl}/api/books?bookOrAuthorName=${bookOrAuthorName}`;
        const response = await axios.get(url, this.authHeaders());
        return response.data.map((book) => new BookModel(book));
    }

    static authHeaders() {
        return {
            auth: {
                username: 'test2@book.com',
                password: 'test',
            },
        }
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get authorName() {
        return this._author.name;
    }

    get price() {
        return this._price.currency + " " + this._price.amount
    }

}