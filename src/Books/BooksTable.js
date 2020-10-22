import React from "react";

export default function BooksTable(props) {
    const books = props.books;
    return <table>
        <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
        </tr>
        </thead>
        <tbody>
        {
            books.map((book) => {
                return <tr>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.price}</td>
                </tr>
            })
        }
        </tbody>
    </table>
}