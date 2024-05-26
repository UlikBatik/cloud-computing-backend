const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const accessValidation = require("../middleware/accessValidation");
const postController = require("../controller/postController");
const Multer = require('multer');
const images = require('../modules/images');
const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
})
router.get("/", (req, res) => {
    res.status(200).json({
        "message": "Welcome to UlikBatik API server. We recommend that you first register and login before accessing our endpoints."
    })
});


router.post('/register', auth.register)
router.post('/login', auth.login)
router.get('/users', accessValidation, auth.getUsers )

router.get('/posts', accessValidation, postController.getPosts)
router.get('/posts/:userId', accessValidation, postController.getPostsByUser)
// router.post("/uploadImage", multer.single('image'), images.uploadToGcs)
// router.get("/getimage/:imageid",  images.viewImgSpecific)


module.exports = router;