import express from 'express';
import cors from 'cors';
import routes from './routes/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello world!');
});
app.use('/api', routes);

export default app;
