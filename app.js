import { runBot } from './back/main.js'
import express from 'express';
import { readFileSync } from 'fs';

const output = readFileSync(new URL('./back/data.json', import.meta.url));

const app = express();
const port = 3000

app.use(express.static('front'));

app.get('/datajson', (req, res) => {
  res.send(output.toString());
})

runBot();

app.listen(port, () => {
    console.log(`Acesse o projeto em: http://localhost:${port}/index.html`)
  })