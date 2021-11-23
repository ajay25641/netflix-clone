const API_KEY = 'dda6558657b358fc0772f5f4ec4f8fb1' ;
const requests = {
    fetchTrending : `/trending/all/week?api_key=${API_KEY}&language=en=us`,
    fetchNetflixOriginals : `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated : `/movie/top_rated?api_key=${API_KEY}&language=en=us`,
    fetchActionMovies : `/discover/movie?api_key=${API_KEY}&with_generes=28`,
    fetchComedyMovies : `/discover/movie?api_key=${API_KEY}&with_generes=35`,
    fetchHorrorMovies : `/discover/movie?api_key=${API_KEY}&with_generes=27`,
    fetchRomanceMovies : `/discover/movie?api_key=${API_KEY}&with_generes=10749`,
    fetchDocumentries : `/discover/movie?api_key=${API_KEY}&with_generes=99`
};

export default requests;