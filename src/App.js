import "./App.css";
import { Row } from "./Components/Row";
import requests from "./request";
import Banner from "./Components/Banner";
import Nav from "./Components/Nav";
import { AllMovies } from "./Components/AllMovies";



function App() {

  return (
    <div className="App">
    
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        key='1'
      />
      <Row key='2' title="TRENDING NOW " fetchUrl={requests.fetchTrending} />
      <Row key='3' title="TOP RATED MOVIES " fetchUrl={requests.fetchTopRated} />
      <AllMovies />
    </div>
  );
}

export default App;
