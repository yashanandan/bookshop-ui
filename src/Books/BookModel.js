import axios from 'axios';

export default class BookModel {
    static fetchAll() {
        return axios.get('/books');
    }
}