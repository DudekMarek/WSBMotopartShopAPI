import User from "../models/userModel.js";

async function get(req, res, next) {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    });
}

async function create(req, res, next) {
  const user = req.body;

  if (!user || !user.username || !user.password || !user.userType) {
    return res.status(400).json({ error: "Incomplete or invalid user data" });
  }
  User.create(user)
    .then((user) => {
      res.json({
        message: `User created`,
        user: user,
      });
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

export { get, create };
