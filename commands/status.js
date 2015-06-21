import { db } from '../ghettodb';

export default async function(req, res) {
  let name = req.params.name;
  if (!name) {
    return res.json({ message: 'No name RIP' });
  }
  console.log('status name', name);
  res.json({
    status: db[name]
  });
}
