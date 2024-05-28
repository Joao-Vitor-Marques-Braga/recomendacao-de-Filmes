import express from 'express';
import axios from 'axios';
import { exec } from 'child_process';
import path from 'path';

const app = express();
const __dirname = path.resolve();

const TMDB_API_KEY = '03cffcae1a1139d74cbf8826df929938'; 

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/recommendations/:query', async (req, res) => {
  const query = req.params.query;

  try {
    const recommendations = await buscarFilmes(query);
    const prologResult = await executarProlog(query, recommendations);
    res.json(prologResult);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

async function buscarFilmes(query) {
  const isNumber = !isNaN(query);
  const endpoint = isNumber 
    ? `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&year=${query}`
    : `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`;
  
  const response = await axios.get(endpoint);
  return response.data.results.map(movie => ({
    title: movie.title,
    genre: movie.genre_ids.join(','), // IDs dos gêneros, precisaremos mapear para nomes
    director: 'unknown', // Como a API não retorna diretamente o diretor, isso pode ser mapeado em um passo futuro
    year: new Date(movie.release_date).getFullYear()
  }));
}

function executarProlog(query, filmes) {
  return new Promise((resolve, reject) => {
    const prologFilmes = filmes.map(filme => `filme('${filme.title}', '${filme.genre}', '${filme.director}', ${filme.year}).`).join('\n');
    const prologQuery = determinarConsultaProlog(query);

    const prologScript = `
    ${prologFilmes}
    ${prologQuery}
    `;

    console.log('Prolog Script:', prologScript); // Adicione este log

    exec(`swipl -s api.pl -g "${prologScript}, halt."`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing Prolog:', error);
        console.error('Stderr:', stderr); // Adicione este log
        reject(error);
      } else {
        const recommendations = stdout.trim().split('\n').map(filme => filme.trim());
        resolve(recommendations);
      }
    });
  });
}

function determinarConsultaProlog(query) {
  if (!isNaN(query)) {
    return `recomendar_por_ano(${query}, Filmes), write(Filmes)`;
  } else {
    return `recomendar_por_genero('${query}', Filmes); recomendar_por_diretor('${query}', Filmes), write(Filmes)`;
  }
}

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
