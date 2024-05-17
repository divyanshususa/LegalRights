const mongoose = require("mongoose");

const saleMainDocumentSchema = new mongoose.Schema({
  colonyName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  minLandRate: {
    type: String,
    required: true,
  },
  costOfConstruction: {
    type: String,
    default: "N/A",
  },
  totalFlatArea: {
    type: Number,
    required: true,
  },
  numberOfFloors: {
    type: Number,
    required: true,
  },
  isLiftProvided: {
    type: Boolean,
    required: true,
  },
  yearOfConstruction: {
    type: String,
    default: "N/A",
  },
  typeOfColony: {
    type: String,
    required: true,
  },
  buildingStatus: {
    type: String,
    required: true,
  },
  useFactor: {
    type: Number,
    required: true,
  },
});

const SaleMainDocument = mongoose.model(
  "SaleMainDocument",
  saleMainDocumentSchema
);

module.exports = SaleMainDocument;
