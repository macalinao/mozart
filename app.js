import express from 'express';

import provision from './commands/provision';
import compose from './commands/compose';

let app = express();

app.post('/provision', provision);
app.post('/compose', compose);

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
