import React from "react";
import Row from "./components/Row";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import requests from "./request";

// Style
import "./App.css";

function App() {
  return (
    // Let's use BEM convention
    <div className="app">
      <Navbar />
      <Banner />
      <Row
        title="Netflix originals"
        dataUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Movies" dataUrl={requests.fetchTrending} />
      <Row title="Top Rated" dataUrl={requests.fetchTopRated} />
      <Row title="Action Movies" dataUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" dataUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" dataUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" dataUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" dataUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
