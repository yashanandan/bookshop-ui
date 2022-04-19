import axios from 'axios';

export default class PurchaseService {
    static orderBook = async (orderDetails) => {
        const baseUrl = process.env.REACT_APP_BOOK_SERVICE_URL;
        const url = `${baseUrl}/orders`;
        const result = await axios.post(url, orderDetails, this.authHeaders());
        return result.data;
    }


    static authHeaders() {
        return {
            auth: {
                username: 'test2@book.com',
                password: 'test',
            },
        }
    }
}