const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const accessValidation = require("../middleware/accessValidation");

router.get("/", (req, res) => {
    res.status(200).json({
        "message": "Welcome to Rejuvify API server. We recommend that you first register and login before accessing our endpoints."
    })
});

// router.get('/register', (req, res) => {
//     res.status(200).json({
//         "status": true,
//         "message": "Register page"
//     })

// })

router.get('/users', accessValidation, auth.getUsers )

router.post('/register', auth.register)
router.post('/login', auth.login)

module.exports = router;