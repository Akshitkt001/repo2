import React from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import "./styles/App.css"; // Make sure this file contains necessary styles

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <SearchBar />
      </main>
      <footer className="footer">
        <p>All rights reserved ® Akshit Kumar Tiwari</p>
      </footer>
    </div>
  );
}

export default App;
