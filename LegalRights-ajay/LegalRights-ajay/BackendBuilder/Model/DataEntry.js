const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  slipNo: { type: String, required: true },
  doc: { type: String, required: true },
  firstParty: { type: String, required: true },
  secondParty: { type: String, required: true },
  propDetail: { type: String, required: true },
  regNo: { type: String, required: true },
  bNo: { type: String, required: true },
  volNo: { type: String, required: true },
  pageNo: { type: String, required: true },
  regDate: { type: Date, required: true }
},{timestamps:true});

const Entry = mongoose.model('Entry', EntrySchema);

module.exports = Entry;
