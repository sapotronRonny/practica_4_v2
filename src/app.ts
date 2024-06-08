import express from 'express';
import routes from './router/routes';

const app = express();

app.use(express.json());
app.use('/api', routes);
app.get('/', (req, res) => {
  res.send('¡Hola, Bienvenido al sistema!');
});

const PORT = process.env.PORT || 3150;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});