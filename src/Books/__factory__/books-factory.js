import BookModel from "../BookModel";

export default function booksFactory() {
    return [new BookModel({id: 1, name: "Outliers", authorName: "Malcom Gladwell", price: {amount: 200, currency: "INR"}}),
        new BookModel({id: 2, name: "Harry Potter", authorName: "J K Rowling", price: {amount: 500, currency: "INR"}})];
}
