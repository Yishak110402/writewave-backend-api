const express = require("express");
const multer = require("multer")
const path = require("path")
const router = express.Router();
const authControllers = require("./../controllers/authControllers");
const userControllers = require("./../controllers/userControllers");
router.use(express.json());

const profileStorage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, path.resolve(__dirname, "./../public/profiles"))
  },
  filename: (req, file, cb)=>{
    const fileExt = file.mimetype.split('/')[1]
    cb(null, `${req.params.id}_profile-pic.${fileExt}`)
  }
})

const profileUpload = multer({
  storage: profileStorage
})

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.get("/", userControllers.getAllUsers);
router
  .route("/:id")
  .get(userControllers.getUserById)
  .patch(authControllers.updateUserDetails)
  .delete(userControllers.deleteUser);
router.get("/posts/:id", userControllers.getUserPosts);
router.post("/addprofilepic/:id", userControllers.confirmUser, profileUpload.single("profile-pic") , userControllers.addProfilePic)
router.post("/verify", authControllers.sendVerification)

module.exports = router;
