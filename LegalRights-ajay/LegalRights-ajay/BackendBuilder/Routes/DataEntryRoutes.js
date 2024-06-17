const express = require("express");

const  dataentrycontroller= require("../Controller/DataEntry")
const router = express.Router();

router.post("/create-entry", dataentrycontroller.createDataEntry);
router.post("/create-detail-group", dataentrycontroller.createDetailGroup);
router.post("/create-ledger-entry", dataentrycontroller.createLedgerEntry);
router.get("/get-entries", dataentrycontroller.getalldataentry);
router.get("/get-detail-group", dataentrycontroller.getalldetailgroup);
router.get("/get-ledger-entry", dataentrycontroller.getallledgerentry);
router.patch("/update-status/:id", dataentrycontroller.changestatusofentry);

module.exports = router;