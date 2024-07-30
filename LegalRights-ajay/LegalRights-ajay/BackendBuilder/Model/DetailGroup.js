const mongoose = require('mongoose');

const NewEntrySchema = new mongoose.Schema({
  serialNo: { type: Number, required: true },
  document: { type: String, required: true },
  propNo: { type: String, required: true },
  Status: { type: String, default: "completed" }, // Fix: typo in "default"
  partyDealer: { type: String, required: true },
  eStamp: { type: String, required: true },
  eRegFee: { type: String, required: true },
  ngdrsNo: { type: String, required: true },
  appDate: { type: Date, required: true },
  dCheck: { type: String, required: true },
  finalPrint: { type: String, required: true },
});

const DetailGroup = mongoose.model('DetailGroup', NewEntrySchema);

module.exports = DetailGroup;
