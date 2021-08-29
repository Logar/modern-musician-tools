import * as mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: String,
  key: String,
  videoSrc: String,
});

const Song = mongoose.model('Song', songSchema);

export default Song;
