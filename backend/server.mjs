import express from 'express';
import { exec } from 'child_process';
import path from 'path';

const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/recommendations/searchType/:query', (req, res) => {
  const query = req.params.query;
  const searchType = req.params.searchType;
  console.log(`Type: ${searchType}`);
  console.log(`Query: ${query}`);
  let PrologQuery;
  if (searchType === "diretor") {
    PrologQuery = `swipl -s api.pl -g "recomendar_por_diretor('Christopher Nolan', Filmes), write(Filmes), halt."`;
  }
  exec(PrologQuery, (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing Prolog:', error);
      res.status(500).send('Internal server error');
      return;
    } if (stderr) {
      console.log('Stderr:', stderr)
    }
    console.log(`Prolog output: ${stdout}`)
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