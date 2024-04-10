const express = require("express");
const router = express.Router();
const authControllers = require("./../controllers/authControllers");
const userControllers = require("./../controllers/userControllers");
router.use(express.json());

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.get("/", userControllers.getAllUsers);
// router.get('/:id', userControllers.getUserById)
router
  .route("/:id")
  .get(userControllers.getUserById)
  .patch(authControllers.updateUserDetails)
  .delete(userControllers.deleteUser);
router.get("/posts/:id", userControllers.getUserPosts);

module.exports = router;
