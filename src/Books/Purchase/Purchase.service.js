import axios from 'axios';
import runtimeEnv from '@mars/heroku-js-runtime-env';
export default class PurchaseService {
    static orderBook = async (orderDetails) => {
        const env = runtimeEnv();
        const baseUrl = env.REACT_APP_BOOK_SERVICE_URL;
        const url = `${baseUrl}/api/orders`;
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