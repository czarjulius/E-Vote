import express from 'express';
import bodyParser from 'body-parser';
import router from './server/routes/index';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
  res.send(' Julius Welcome\'s you to E-Vote');
});

app.use('*', (req, res) => res.status(404).json({
  status: '404',
  message: 'route not found',
}));

const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`Listening on port ${port}`); });

export default app;
