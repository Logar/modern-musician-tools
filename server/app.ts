import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';

import setRoutes from './routes';

const app = express();
dotenv.config();
app.set('title', 'Tools for the Modern Musician');
app.set('port', process.env.PORT || 3000);

app.use('/', express.static(path.join(__dirname, '../public')));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

let mongodbURI;
if (process.env.NODE_ENV === 'test') {
  mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  mongodbURI = process.env.MONGODB_URI;
  app.use(morgan('dev'));
}

mongoose
  .connect(mongodbURI)
  .then((db) => {
    console.log('Connected to MongoDB');

    setRoutes(app);

    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    if (!module.parent) {
      app.listen(app.get('port'), () =>
        console.log(`${app.get('title')} listening on port ${app.get('port')}`)
      );
    }
  })
  .catch((err) => console.error(err));

export { app };
