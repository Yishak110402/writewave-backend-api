const express = require("express")
const router = express.Router()
const postControllers = require("./../controllers/postControllers")

router.use(express.json())

router.route('/').get(postControllers.getAllPosts).post(postControllers.createPost)
router.route('/:id').get(postControllers.getPostById).delete(postControllers.deletePost).patch(postControllers.editPost)
router.route('/comment/:id').post(postControllers.addComment)

module.exports = router
