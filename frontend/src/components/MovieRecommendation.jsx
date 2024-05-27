import React from 'react';

const MovieRecommendation = ({ recommendations }) => {
  return (
    <div>
      <h2>Aqui estão nossas recomendações:</h2>
      <ul>
        {recommendations.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieRecommendation;
