const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const accessValidation = require("../middleware/accessValidation");
const postController = require("../controller/postController");
const scrapController = require("../controller/scrapController");
const images = require("../modules/images");
const Multer = require('multer');
const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 3 * 1024 * 1024
})


router.get("/", (req, res) => {
    res.status(200).json({
        "message": "Welcome to UlikBatik API server. We recommend that you first register and login before accessing our endpoints."
    })
});

// Auth routes
router.post('/register', auth.register)
router.post('/login', auth.login)
router.get('/users', accessValidation, auth.getUsers )

// router.post("/uploadImage", multer.single('image'), images.uploadToGcs)
// router.get("/getimage/:imageid",  images.viewImgSpecific)

// Post routes
router.get('/posts', accessValidation, postController.getPosts)
router.get('/posts/:userId', accessValidation, postController.getPostsByUser)
router.post('/posts', accessValidation, multer.single('IMAGE'), images.uploadToGcs, postController.createPost)
router.get('/post/:postId', accessValidation, postController.getPostById)
router.get('/posts/:batikId', accessValidation, postController.getPostsByBatikId)
router.delete('/post/:postId', accessValidation, postController.deletePost)

// Batik routes
router.get('/batiks', accessValidation, postController.getBatiks)
router.get('/batik/:batikId', accessValidation, postController.getBatikById)
// router.get('/batiks/:query', accessValidation, postController.queryBatik)
// Matahari
router.get("/search/:query", accessValidation, scrapController.makeScarp);


module.exports = router;