import { exec } from 'child-process-promise';
import P from 'bluebird';
import md5 from 'MD5';
import { db } from '../ghettodb';

export default async function(req, res) {
  let repo = req.body.repo;
  let branch = req.body.branch;
  let machine = req.body.machine;
  let env = await findEnv(machine);
  let randy = 'mozart-' + md5(repo + '/' + branch);
  console.log('sending res to frontend')
  res.json({
    randy: compose.randy
  });
  res.end();
  let compose = await spawnCompose(randy, repo, branch, env);
}

async function findEnv(machine) {
  console.log('Finding env...');
  let env = await P.resolve(exec(`docker-machine env ${machine}`));
  return env.stdout.split('\n').filter((c) => c != '').filter((c) => c.split('')[0] != '#').join(';');
}

async function spawnCompose(randy, repo, branch, env) {
  let logPath = '/mozart/' + id + '.log';
  db[id+'x'] = {};
  db[id+'x'].status = false;
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
  console.log(joined);
  let results = await P.resolve(exec(joined));
  db[id+'x'].status = true;
  return { results, randy };
}
