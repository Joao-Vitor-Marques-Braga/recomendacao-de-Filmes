import express from 'express';
import { exec } from 'child_process';
import path from 'path';

const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/recommendations/:query', (req, res) => {
  const query = req.params.query;
  exec(`swipl -s api.pl -g "recomendar_por_genero('${query}', Filmes), write(Filmes), halt."`, (error, stdout) => {
    if (error) {
      console.error('Error executing Prolog:', error);
      res.status(500).send('Internal server error');
    } else {
      const recommendations = stdout.trim().split(',');
      res.json(recommendations);
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
