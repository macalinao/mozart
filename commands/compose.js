import { exec } from 'child-process-promise';
import md5 from 'MD5';

export default async function(req, res) {
  let repo = req.body.repo;
  let path = req.body.path;
  let machine = req.body.machine;
  let env = await findEnv(machine);
  let compose = await spawnCompose(repo, branch, env);
  res.json({
    err: compose.results.stderr,
    out: compose.results.stdout,
    randy: compose.randy
  });
}

async function findEnv(machine) {
  let env = await exec(`docker-machine env ${machine}`);
  return env.split('\n').join(';');
}

async function spawnCompose(repo, branch, env) {
  let randy = 'mozart-' + md5(repo + '/' + branch);
  let cmds = [
    env,
    `git clone -b ${branch} ${repo} ${randy}`,
    `cd ${randy}`,
    `docker-compose up -d`
  ];
  let results = await exec(cmds.join(';'));
  return { results, randy };
}
