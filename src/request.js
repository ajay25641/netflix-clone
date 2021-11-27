const API_KEY = '7f5818df9df5b63b9d68dbd47b4f79fa' ;
const requests = {
    fetchTrending : `/trending/all/week?api_key=${API_KEY}&language=en=us`,
    fetchNetflixOriginals : `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated : `/movie/top_rated?api_key=${API_KEY}&language=en=us`,
    fetchAll : `/discover/movie?api_key=${API_KEY}`,
    
};

export default requests;