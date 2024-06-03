import express from 'express';
import { exec } from 'child_process';
import path from 'path';

const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/recommendations', (req, res) => {
  const { diretor, ano, genero, ator } = req.query;

  let PrologQuery = 'swipl -s api.pl -g "recomendar(Filme';
  
  PrologQuery += diretor ? `, '${diretor}'` : `, _`;
  PrologQuery += ano ? `, '${ano}'` : `, _`;
  PrologQuery += genero ? `, '${genero}'` : `, _`;
  PrologQuery += ator ? `, '${ator}'` : `, _`;
  
  PrologQuery += '), write(Filme), halt."';

  console.log(`Executing Prolog query: ${PrologQuery}`);
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

    if (!stdout.trim()) {
      res.json([]);
      return;
    }

    const recommendations = stdout.trim().split('.').map(item => item.trim()).filter(item => item);
    console.log(`Parsed recommendations: ${recommendations}`);
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
