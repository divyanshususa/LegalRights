const SaleMainDocument = require("../Model/SaleMainDocument");

// CRUD operations
exports.createSaleMainDocument = async (req, res) => {
  try {
    const saleMainDocument = await SaleMainDocument.create(req.body);
    res.status(201).json({ success: true, data: saleMainDocument });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getSaleMainDocuments = async (req, res) => {
  try {
    const saleMainDocuments = await SaleMainDocument.find();
    res.status(200).json({ success: true, data: saleMainDocuments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getSaleMainDocumentById = async (req, res) => {
  try {
    const saleMainDocument = await SaleMainDocument.findById(req.params.id);
    if (!saleMainDocument) {
      return res
        .status(404)
        .json({ success: false, error: "SaleMainDocument not found" });
    }
    res.status(200).json({ success: true, data: saleMainDocument });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateSaleMainDocument = async (req, res) => {
  try {
    const saleMainDocument = await SaleMainDocument.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!saleMainDocument) {
      return res
        .status(404)
        .json({ success: false, error: "SaleMainDocument not found" });
    }
    res.status(200).json({ success: true, data: saleMainDocument });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteSaleMainDocument = async (req, res) => {
  try {
    const saleMainDocument = await SaleMainDocument.findByIdAndDelete(
      req.params.id
    );
    if (!saleMainDocument) {
      return res
        .status(404)
        .json({ success: false, error: "SaleMainDocument not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
