const Entry = require("../Model/DataEntry");
const DetailGroup = require("../Model/DetailGroup");
const LedgerEntry = require("../Model/LedgerEntry");

exports.createDataEntry= async (req, res) => {
    try {
        console.log("sdljafd")
      const entry = new Entry(req.body);
      await entry.save();
      res.status(201).send(entry);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  exports.createDetailGroup= async (req, res) => {
    try {
        console.log("sdljafd")
      const entry = new DetailGroup(req.body);
      console.log(entry)
      await entry.save();
      res.status(201).send(entry);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  exports.createLedgerEntry= async (req, res) => {
    try {
        const ledgerEntry = new LedgerEntry(req.body);
        await ledgerEntry.save();
        res.status(201).send(ledgerEntry);
      } catch (error) {
        res.status(400).send(error);
      }
  };
  exports.getalldataentry= async(req,res)=>{
    try {
        const entries = await Entry.find()
        console.log(entries)
        res.json(entries)
    } catch (error) {
        
    }
  }

  exports.getalldetailgroup= async(req,res)=>{
    try {
        const entries = await DetailGroup.find()
        console.log(entries)
        res.json(entries)
    } catch (error) {
        
    }
  }

  exports.getallledgerentry= async(req,res)=>{
    try {
        const entries = await LedgerEntry.find()
        console.log(entries)
        res.json(entries)
    } catch (error) {
        
    }
  }

  exports.changestatusofentry= async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    const allowedUpdates = ['eStamp', 'eRegFee', 'dCheck', 'finalPrint'];
    const isValidUpdate = Object.keys(updates).every(update => allowedUpdates.includes(update));
  
    if (!isValidUpdate) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }
  
    try {
      const entry = await DetailGroup.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
      if (!entry) {
        return res.status(404).send();
      }
      res.send(entry);
    } catch (error) {
      res.status(400).send(error);
    }
  }