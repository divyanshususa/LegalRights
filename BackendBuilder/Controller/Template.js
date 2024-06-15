const Template = require("../Model/Template");
const mongoose = require("mongoose"); 

// Create a Template
module.exports.createTemplate = async (req, res) => {
  console.log(req.body)
  try {
    const { descriptions, Name } = req.body;

    if (!descriptions) {
      return res.status(400).json({ message: "descriptions is required" });
    }

    if (!Name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // if (!userId) {
    //   return res.status(400).json({ message: "userId is required" });
    // }

    const newTemplate = new Template({
      descriptions,
      // userId,
      Name,
    });

    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (error) {
    console.error("Error creating template:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all Templates
module.exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    return res.status(200).json({ templates });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving templates" });
  }
};

// Get a Template by Name
module.exports.getTemplateByName = async (req, res) => {
  try {
    const { Name } = req.params;
    const template = await Template.findOne({Name: Name });

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    return res.status(200).json({ template });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving template" });
  }
};

// Get a Template by ID
module.exports.getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    return res.status(200).json({ template });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving template" });
  }
};

// Update a Template by Name
module.exports.updateTemplateByName = async (req, res) => {
  try {
    const { Name } = req.params;
    const template = await Template.findOne({ Name });

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    Object.assign(template, req.body);
    await template.save();

    return res.status(200).json({ message: "Template updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a Template by ID
module.exports.updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    Object.assign(template, req.body);
    await template.save();

    return res.status(200).json({ message: "Template updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;
 console.log(id)
    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const template = await Template.findByIdAndDelete(id);
    console.log(template)
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    return res.status(200).json({ message: "Template deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
