import React from 'react';
import './App.css';
import ListBooksContainer from "./Books/ListBooksContainer";

function App() {
  return (
    <div className="App">
        <h1>Book Store</h1>
        <div className="App-layout">
            <ListBooksContainer/>
        </div>
    </div>
  );
}

export default App;
