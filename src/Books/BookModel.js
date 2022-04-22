import axios from 'axios';
import runtimeEnv from '@mars/heroku-js-runtime-env';

export default class BookModel {
    constructor(args) {
        this._id = args.id;
        this._title = args.name;
        this._author = {name: args.authorName};
        this._price = args.price;
        this._countAvailable = args.countAvailable;
    }

    static fetchAll = async (bookOrAuthorName = '') => {
        const env = runtimeEnv();
        const baseUrl = env.REACT_APP_BOOK_SERVICE_URL;
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

    get countAvailable() {
        return this._countAvailable;
    }

}
