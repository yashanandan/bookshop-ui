import React from 'react';
import './App.css';
import ListBooksContainer from "./Books/ListBooksContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookDetail from "./Books/BookDetail";

function App() {
    return (
        <div className="App">
            <h1>Book Store</h1>
            <div className="App-layout">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<ListBooksContainer />}></Route>
                        <Route path="/books/:id" element={<BookDetail />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default App;
