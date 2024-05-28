import React, { useState } from 'react'

const SearchForm = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
        setQuery('');
    }

  return (
    <div>
    <h1>Informe aqui o que gostaria de assistir:</h1>
    <form onSubmit={handleSubmit}>
      <input
        placeholder='genero, ano de lançamento, diretor'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type='submit'>Buscar recomendações</button>
    </form>
  </div>
  )
}

export default SearchForm