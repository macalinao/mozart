import machine from 'dockermachine';

import { db } from '../ghettodb';

export default async function(req, res) {
  let token = req.body.token;
  if (!token) {
    return res.json({ message: 'No token RIP' });
  }
  let name = req.body.name || 'mozart-' + Math.floor(Math.random() * 10000).toString();
  res.json({ name });
  let machine = await spawnMachine(token, name);
  db[machine.Driver.MachineName] = true;
}

async function spawnMachine(doToken, name) {
  return machine.create(name, {
    driver: 'digitalocean',
    'digitalocean-access-token': doToken,
    'digitalocean-size': '1gb'
  });
}
