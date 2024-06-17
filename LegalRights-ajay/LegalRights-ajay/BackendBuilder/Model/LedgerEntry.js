const mongoose = require('mongoose');

const LedgerEntrySchema = new mongoose.Schema({
 date: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  credit: { type: Number, required: true },
  balance: { type: Number, required: true },
  entries: [{ 
    description: { type: String, required: true },
    debit: { type: Number, required: true },
    balance: { type: Number, required: true },
    sNo: { type: Number, required: true }
  }]
});


const LedgerEntry = mongoose.model('LedgerEntry', LedgerEntrySchema);

module.exports = LedgerEntry;
