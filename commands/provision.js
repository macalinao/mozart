import machine from 'dockermachine';

export default async function(req, res) {
  let token = req.body.token;
  if (!token) {
    return res.json({ message: 'No token RIP' });
  }
  let name = req.body.name || 'mozart-' + Math.floor(Math.random() * 10000).toString();
  res.json({ name });
  await spawnMachine(token, name);
}

async function spawnMachine(doToken, name) {
  return machine.create(name, {
    driver: 'digitalocean',
    'digitalocean-access-token': doToken,
    'digitalocean-size': '1gb'
  });
}
