import { exec } from 'child-process-promise';
import md5 from 'MD5';

export default async function(req, res) {
  let repo = req.body.repo;
  let path = req.body.path;
  let compose = await spawnCompose(repo, branch);
  res.json({
    err: compose.results.stderr,
    out: compose.results.stdout,
    randy: compose.randy
  });
}

async function spawnCompose(repo, branch) {
  let randy = 'mozart-' + md5(repo + '/' + branch);
  let cmds = [
    `git clone -b ${branch} ${repo} ${randy}`,
    `cd ${randy}`,
    `docker-compose up -d`
  ];
  let results = await exec(cmds.join(';'));
  return { results, randy };
}
