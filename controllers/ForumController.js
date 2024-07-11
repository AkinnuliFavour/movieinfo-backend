const Forum = require("../models/Forum");

// Create new forum
const createForum = async (req, res) => {
  try {
    const { name, description } = req.body;
    const forum = new Forum({
      name,
      description,
      createdBy: req.user.id, // Assuming req.user is set by auth middleware
    });
    await forum.save();
    res.status(201).json(forum);
  } catch (error) {
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

module.exports = new ForumController();
