import express from 'express';
import bodyParser from 'body-parser';

import ghetto from './ghettodb';
import provision from './commands/provision';
import compose from './commands/compose';
import decompose from './commands/decompose';

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ghetto welcome page
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Mozart.',
    statii: ghetto.db
  });
});

app.post('/provision', provision);
app.post('/compose', compose);
app.post('/decompose', decompose);

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
