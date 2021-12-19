const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postsCtrl = require("../controllers/posts");
router.get("/comment",  auth, postsCtrl.getAllCommentsForPost);
router.get("/",          auth, postsCtrl.getAllPosts);
router.post("/",         auth, multer, postsCtrl.createPost);
router.get("/:id",       auth, postsCtrl.getOnePost);
router.put("/:id",       auth, multer, postsCtrl.modifyPost);
router.delete("/:id",    auth, postsCtrl.deletePost);
router.post("/like", auth, multer, postsCtrl.likePost);
router.post("/comment", auth, postsCtrl.commentPost);



module.exports = router;
