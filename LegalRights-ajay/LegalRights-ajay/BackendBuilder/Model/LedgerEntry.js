const mongoose = require('mongoose');

const LedgerEntrySchema = new mongoose.Schema({
  Sno_Credit: { type: Number, required: true },
  date_Credit: { type: Date, required: true },
  phoneNumber_Credit: { type: String, required: true },
  credit_Credit: { type: Number, required: true },
  balance_Credit: { type: Number, required: true },
  date_debit: { type: Date, required: true },
  debit_debit: { type: Number, required: true },
  balance_debit: { type: Number, required: true },
  Sno_debit: { type: Number, required: true },
});


const LedgerEntry = mongoose.model('LedgerEntry', LedgerEntrySchema);

module.exports = LedgerEntry;
