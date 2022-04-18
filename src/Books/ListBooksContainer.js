import React from "react";
import BookModel from "./BookModel";
import BooksTable from "./BooksTable";

export default class ListBooksContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            books: []
        }
    }
    componentDidMount() {
        BookModel.fetchAll().then((books) => {
            console.log('books ', books)
            this.setState({books: books});
        })
    }

    render() {
        return <div>
            <BooksTable books={this.state.books}/>
        </div>
    }
}