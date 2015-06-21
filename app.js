import express from 'express';
import bodyParser from 'body-parser';

import { db } from './ghettodb';
import provision from './commands/provision';
import compose from './commands/compose';
import decompose from './commands/decompose';
import logs from './commands/logs';

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ghetto welcome page
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Mozart.',
    machines: db
  });
});

app.post('/provision', provision);
app.post('/compose', compose);
app.post('/decompose/', decompose);
app.get('/logs/:id', logs);

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
