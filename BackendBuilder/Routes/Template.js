const express = require("express");
const PDFParser = require("pdf-parse");
const fs = require("fs");
const path = require("path");
const htmlToPdf = require("html-pdf");

const router = express.Router();

router.get("/pdfToHtml", async (req, res) => {
  try {
const pdfFilePath =
  "D:\\Builder\\BackendBuilder\\Template\\SaleDeedFinalFlat.pdf";


    // Read the PDF file
    const dataBuffer = fs.readFileSync(pdfFilePath);

    // Parse the PDF data
    const pdfData = await PDFParser(dataBuffer);

    // Extract text content from PDF data
    const textContent = pdfData.text;

    // Convert text content to HTML
    const htmlContent = `<div>${textContent}</div>`; // Wrapping in <div> for simplicity

    // Send the HTML content as JSON response
    res.json({ htmlContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to parse PDF" });
  }
});

router.post("/htmlToPdf", async (req, res) => {
  try {
    const { htmlContent } = req.body;

    // Generate PDF from HTML
    htmlToPdf.create(htmlContent).toStream((err, stream) => {
      if (err) {
        throw new Error("Failed to convert HTML to PDF");
      }
      res.setHeader("Content-Type", "application/pdf");
      stream.pipe(res);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
