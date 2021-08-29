import * as mongoose from 'mongoose';

const chordSchema = new mongoose.Schema({
  songID: String,
  timestamp: Number,
  root: String,
  bass: String,
  quality: String,
  numeral: String,
  alias: String,
  diatonic: Boolean,
});

const Chord = mongoose.model('Chord', chordSchema);

export default Chord;
