import Chord from '../models/chord';
import BaseCtrl from './base';

export default class ChordCtrl extends BaseCtrl {
  model = Chord;

  // Get all
  getAll = async (req, res) => {
    try {
      // Find all that matches and sort by timestamp asc
      const docs = await this.model
        .find({ songID: req.params.id })
        .sort({ timestamp: 1 });
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
}
