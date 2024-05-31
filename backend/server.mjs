import express from 'express';
import { exec } from 'child_process';
import path from 'path';

const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/recommendations/:searchType/:query', (req, res) => {
  const query = req.params.query;
  const type = req.params.searchType;
  console.log(`Type: ${type}`);
  console.log(`Query: ${query}`);
  
  let PrologQuery;
  if (type === "diretor") {
    PrologQuery = `swipl -s api.pl -g "recomendar_por_diretor('${query}', Filmes), write(Filmes), halt."`;
  } else if(type === 'ano') {
    PrologQuery = `swipl -s api.pl -g "recomendar_por_ano('${query}', Filmes), write(Filmes), halt."`;
  } else if (type === 'gênero' || type === 'genero'){
    PrologQuery = `swipl -s api.pl -g "recomendar_por_genero('${query}', Filmes), write(Filmes), halt."`;
  }

  exec(PrologQuery, (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing Prolog:', error);
      res.status(500).send('Internal server error');
      return;
    }
    if (stderr) {
      console.log('Stderr:', stderr);
    }
    console.log(`Prolog output: ${stdout}`);
    const recommendations = stdout.trim().split(',').map(item => item.trim());
    res.json(recommendations);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
