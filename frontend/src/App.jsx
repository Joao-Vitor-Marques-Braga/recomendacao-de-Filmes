import React from 'react';
import SearchForm from './components/SearchForm';
import MovieRecommendation from './components/MovieRecommendation';
import axios from 'axios';

function App() {
  const [recommendations, setRecommendations] = React.useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3001/recommendations/${query}`);
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      <MovieRecommendation recommendations={recommendations} />
    </div>
  );
}

export default App;
