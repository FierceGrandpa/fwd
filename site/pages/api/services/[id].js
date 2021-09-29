import { Repository } from 'helpers/Repository';


export default function handler(req, res) {
  const repo = new Repository('services');

  switch (req.method) {
    case 'GET':
      return res.status(200).json(repo.getById(req.query.id));
    case 'PUT':
    {
      try {
        repo.update(req.query.id, req.body);
        return res.status(200).json({});
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    }
    case 'DELETE':
    {
      repo.remove(req.query.id);
      return res.status(200).json({});
    }
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
