const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getPosts = async (req, res) => {
    const posts = await prisma.post.findMany();
    res.status(200).json({
        "status": true,
        "message": "Posts retrieved successfully",
        "data": posts
    })
}

exports.getPostsByUser = async (req, res) => {
    const userId = req.params.userId;

    const count = await prisma.post.count({
        where: {
            USERID: parseInt(userId)
        }
    });

    if (count === 0) {
        return res.status(200).json({
            "status": true,
            "message": "No posts found for this user"
        });
    }

    const posts = await prisma.post.findMany({
        where: {
            USERID: parseInt(userId)
        }
    });
    res.status(200).json({
        "status": true,
        "message": "Posts retrieved successfully",
        "data": posts
    })
}
