const express = require("express");
const router = express.Router();
const saleMainDocumentController = require("../Controller/saleMainDocumentController");

router.post("/", saleMainDocumentController.createSaleMainDocument);
router.get("/", saleMainDocumentController.getSaleMainDocuments);
router.get("/:id", saleMainDocumentController.getSaleMainDocumentById);
router.put("/:id", saleMainDocumentController.updateSaleMainDocument);
router.delete("/:id", saleMainDocumentController.deleteSaleMainDocument);
 
module.exports = router;
