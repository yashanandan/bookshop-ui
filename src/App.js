import React from 'react';
import './App.css';
import ListBooksContainer from "./Books/ListBooksContainer";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import BookDetail from "./Books/BookDetail";
import Purchase from './Books/Purchase/Purchase'

function App() {
    return (
        <div className="App">
            <h1>Book Store</h1>
            <div className="App-layout">
                <BrowserRouter>
                    <Routes>
                        <Route path='' element={<Navigate to="/books" replace />}  />
                        <Route path="/books" element={<ListBooksContainer />}></Route>
                        <Route path="/books/:id" element={<BookDetail />}></Route>
                        <Route path="/purchase/:id" element={<Purchase />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default App;
