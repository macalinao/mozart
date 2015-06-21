import { spawn } from 'child_process';

export default function(req, res) {
  let token = req.body.token;
  let name = req.body.name || 'mozart-' + Math.floor(Math.random() * 10000).toString();
  let machine = spawnMachine(token, name);
  machine.on('close', (code, signal) => {
    res.json({
      success: true
    });
  });
}

function spawnMachine(doToken, name) {
  return spawn.call([this].concat(`docker-machine create -d digitalocean --digitalocean-access-token=${doToken} --digitalocean-size "1gb" ${name}`.split(' ')));
}
