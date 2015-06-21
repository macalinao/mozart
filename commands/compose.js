import { exec } from 'child-process-promise';
import P from 'bluebird';
import md5 from 'MD5';

export default async function(req, res) {
  let repo = req.body.repo;
  let branch = req.body.branch;
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
  console.log('Finding env...');
  let env = await P.resolve(exec(`docker-machine env ${machine}`));
  return env.stdout.split('\n').filter((c) => c != '').filter((c) => c.split('')[0] != '#').join(';');
}

async function spawnCompose(repo, branch, env) {
  let randy = 'mozart-' + md5(repo + '/' + branch);
  let logPath = '/mozart/' + id + '.log';
  console.log('randy', randy, 'logPath', logPath);
  let cmds = [
    env,
    `mkdir -p /tmp`,
    `cd /tmp`,
    `rm -rf ${randy}`,
    `git clone -b ${branch} ${repo} ${randy}`,
    `cd ${randy}`,
    `docker-compose build > ` + logPath,
    `(docker-compose stop || true)`
    `docker-compose up -d`  + logPath
  ];
  let joined = cmds.join(';');
  console.log(joined,);
  let results = await P.resolve(exec(joined));
  return { results, randy };
}
