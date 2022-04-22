import axios from "axios";
import runtimeEnv from "@mars/heroku-js-runtime-env";
export default class PurchaseService {
  static orderBook = async (orderDetails) => {
    const env = runtimeEnv();
    const baseUrl = env.REACT_APP_BOOK_SERVICE_URL;
    const url = `${baseUrl}/api/orders`;
    const result = await axios.post(url, orderDetails, this.authHeaders());
    return result.data;
  };

  static makePaymentForOrder = async (orderDetails) => {
    try {
      const env = runtimeEnv();
      const baseUrl = env.REACT_APP_BOOK_SERVICE_URL;
      const url = `${baseUrl}/api/orders/${orderDetails.orderId}/payment`;
      const result = await axios.post(url, orderDetails, this.authHeaders());
      if (result.status === 208) {
        return {
          status: true,
          message: result.data,
        };
      }

      return {
        status: true,
      };
    } catch (error) {
      const statusCode = error?.response?.status || 500;
      let message = "";
      if (statusCode === 400) {
        message = error?.response?.data || "Please verify card details!";
      } else if (statusCode === 500) {
        message = `Payment failed. If the amount is deducted it will refund `;
      }
      return {
        status: false,
        message,
        statusCode,
      };
    }
  };

  static authHeaders() {
    return {
      auth: {
        username: "test2@book.com",
        password: "test",
      },
    };
  }
}
