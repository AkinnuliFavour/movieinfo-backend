const isAdmin = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    res.status(403).json({ error: "Access denied. Admin only." });
  }
};

module.exports = isAdmin;
