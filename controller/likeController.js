const prisma = require("../prisma/prisma");

exports.getLikesByUser = async (req, res) => {
    const USERID = req.params.userId;

    try {
        const likes = await prisma.likes.findMany({
            where: {
                USERID: USERID
            }
        })
        res.status(200).json({
            "status": true,
            "message": "Like retrieved successfully",
            "data": likes,
        })
    } catch {
        res.status(500).json({
            "status": false,
            "message": "An unexpected error occurred on the server",
        })
    }
}