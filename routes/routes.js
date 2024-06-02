// Middlewares
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const accessValidation = require("../middleware/accessValidation");
const images = require("../modules/images");
const Multer = require('multer');
const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 3 * 1024 * 1024,
    limits: {
        fileSize: 3 * 1024 * 1024
    }
})

// Controllers
const userController = require("../controller/userController");
const postController = require("../controller/postController");
const batikController = require("../controller/batikController");
const scrapController = require("../controller/scrapController");
const likeController = require("../controller/likeController");
const modelController = require("../controller/modelController");


// Welcome route
router.get("/", (req, res) => {
    res.status(200).json({
        "message": "Welcome to UlikBatik API server. We recommend that you first register and login before accessing our endpoints."
    })
});

// Auth routes
router.post('/register', auth.register)
router.post('/login', auth.login)

// Post routes
router.get('/posts', accessValidation, postController.getPosts)
//router.get('/posts/:userId', accessValidation, postController.getPostsByUser) // ini gaperlu dah dapet dari user
router.post('/posts', accessValidation, multer.single('IMAGE'), images.uploadToGcs, postController.createPost)
router.get('/post/:postId', accessValidation, postController.getPostById)
router.get('/posts/:batikId', accessValidation, postController.getPostsByBatikId)
router.delete('/post/:postId', accessValidation, postController.deletePost)

// Like routes
router.get('/likes/:userId', accessValidation, likeController.getLikesByUser)
router.post('/like/:userId', accessValidation, likeController.likePost)

// Batik routes
router.get('/batiks', accessValidation, batikController.getBatiks)
router.get('/batik/:batikId', accessValidation, batikController.getBatikById)
router.get('/batiks/:query', accessValidation, batikController.queryBatik)

// Matahari routes
router.get("/search/:query", accessValidation, scrapController.makeScarp);
router.post("/predict", accessValidation, multer.single('attachment'), modelController.predit );

// User routes
router.put('/user/:userId', accessValidation, multer.single('IMAGE'), images.uploadToGcs, userController.updateProfile)
router.get('/users', accessValidation, auth.getUsers )
router.get('/user/:userId', accessValidation, userController.getProfile)


module.exports = router;