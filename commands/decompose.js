import { exec } from 'child-process-promise';

export default async function(req, res) {
  let randy = req.body.randy;
  await spawnDecompose(repo, branch);
  res.json({
    success: true
  });
}

async function spawnDecompose(randy) {
  let cmds = [
    `cd ${randy}`,
    `docker-compose stop`
  ];
  let results = await exec(cmds.join(';'));
  return { results, randy };
}

