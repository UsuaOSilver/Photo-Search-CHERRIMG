import React from 'react';
import './App.css';
import SearchPhotos from "./searchPhotos"

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="title">--- CHERIMG ---</h1>
        {/*<p className="sub-title">------</p>*/} 
        <SearchPhotos />
      </div>
    </div>
  );
}

