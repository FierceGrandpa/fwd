import { Repository } from 'helpers/Repository';

export default function handler(req, res) {

  const repo = new Repository('marks');

  switch (req.method) {
    case 'GET':
      return res.status(200).json(repo.getAll());
    case 'POST':
    {
      try {
        repo.create(req.body);
        return res.status(200).json({});
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    }
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
