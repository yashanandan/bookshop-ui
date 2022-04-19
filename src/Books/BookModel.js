import axios from 'axios';

export default class BookModel {
    static fetchAll = async (bookOrAuthorName = '') => {
        const url = `http://localhost:8080/books?bookOrAuthorName=${bookOrAuthorName}`;
        const response = await axios.get(url, this.authHeaders());
        return response.data;
    }

    static authHeaders() {
        return {
            auth: {
                username: 'prem@tw.com',
                password: '1234',
            },
        }
    }
}