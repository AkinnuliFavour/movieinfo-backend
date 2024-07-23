const Forum = require("../models/Forum");

// Create new forum
const createForum = async (req, res) => {
  const { name, description } = req.body;
  const createdBy = req.user.id; // Assuming req.user is set by auth middleware
  console.log(createdBy);
  try {
    if (!name) return res.status(400).json({ error: "Forum name is required" });
    const forum = new Forum({
      name,
      description,
      user: req.user.id, // Assuming req.user is set by auth middleware
    });
    await forum.save();
    res.status(201).json(forum);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating forum" });
  }
};

// Get all forums
const getForums = async (req, res) => {
  try {
    const forums = await Forum.find();
    res.json(forums);
  } catch (error) {
    res.status(500).json({ error: "Error fetching forums" });
  }
};

// ... other methods like getForum, updateForum, deleteForum

module.exports = { createForum, getForums };
