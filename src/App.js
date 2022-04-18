import React from 'react';
import './App.css';
import ListBooksContainer from "./Books/ListBooksContainer";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <h1>Book Store</h1>
                <div className="App-layout">
                    <ListBooksContainer/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
