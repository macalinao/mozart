import { db } from '../ghettodb';
import fs from 'fs';

export default async function(req, res) {
  let id = req.param.id;
  if (!id) {
    return res.json({ message: 'No id RIP' });
  }
  let filepath = '/mozart/'+id+'.log';
  console.log('log id', id, 'filepath', filepath);
  res.json(fs.readFileSync(filepath));
}