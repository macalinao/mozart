import machine from 'dockermachine';

export default async function(req, res) {
  let token = req.body.token;
  let name = req.body.name || 'mozart-' + Math.floor(Math.random() * 10000).toString();
  let machine = await spawnMachine(token, name);
  res.json({ machine });
}

async function spawnMachine(doToken, name) {
  return machine.create(name, {
    driver: 'digitalocean',
    'digitalocean-access-token': doToken,
    'digitalocean-size': '1gb'
  });
}
