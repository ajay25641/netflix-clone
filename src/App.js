import "./App.css";
import { Row } from "./Components/Row";
import requests from "./request";
import Banner from "./Components/Banner";
import Nav from "./Components/Nav";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    document.title = "Movie Data Base";
  });
  return (
    <div className="App">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row title="TRENDING NOW " fetchUrl={requests.fetchTrending} />
      <Row title="TOP RATED MOVIES " fetchUrl={requests.fetchTopRated} />
      <Row title="ACTION MOVIES " fetchUrl={requests.fetchActionMovies} />
      <Row title="ROMANCE MOVIES " fetchUrl={requests.fetchRomanceMovies} />
      <Row title="COMEDY MOVIES " fetchUrl={requests.fetchComedyMovies} />
      <Row title="HORROR MOVIES " fetchUrl={requests.fetchHorrorMovies} />
      <Row title="DOCUMENTRIES " fetchUrl={requests.fetchDocumentries} />
    </div>
  );
}

export default App;
