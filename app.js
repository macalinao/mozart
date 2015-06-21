import express from 'express';
import bodyParser from 'body-parser';

import provision from './commands/provision';
import compose from './commands/compose';

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/provision', provision);
app.post('/compose', compose);
app.post('/decompose', decompose);

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
