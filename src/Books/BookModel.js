import axios from 'axios';

export default class BookModel {
    static fetchAll() {
        return axios.get('http://localhost:8080/books', this.authHeaders());
    }

    static authHeaders() {
        return {
            auth: {
                username: 'foo@test.com',
                password: 'foobar',
            },
        }
    }
}