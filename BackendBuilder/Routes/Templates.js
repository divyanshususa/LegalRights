const express = require("express");
const templateController = require("../Controller/Template"); // Adjust the path as needed

const router = express.Router();

// Create a Template
router.post("/cretaetemplates", templateController.createTemplate);

// Get all Templates
router.get("/getalltemplates", templateController.getTemplates);

// Get a Template by Name
router.get("/templates/name/:Name", templateController.getTemplateByName);

// Get a Template by ID
router.get("/byIdtemplates/:id", templateController.getTemplateById);

// Update a Template by Name
router.put("/ByNametemplates/name/:Name", templateController.updateTemplateByName);

// Update a Template by ID
router.put("/UpdateByIdtemplates/:id", templateController.updateTemplate);

// Delete a Template
router.delete("/DeleteByIdtemplates/:id", templateController.deleteTemplate);

module.exports = router; 
   