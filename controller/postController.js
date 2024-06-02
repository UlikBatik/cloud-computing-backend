const prisma = require("../prisma/prisma")


exports.getPosts = async (req, res) => {
    const posts = await prisma.post.findMany();
    res.status(200).json({
        "status": true,
        "message": "Posts retrieved successfully",
        "data": posts
    }
)
}

exports.getPostsByUser = async (req, res) => {
    const userId = req.params.userId;

    const count = await prisma.post.count({
        where: {
            USERID: userId
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
            USERID: userId
        },
        include: {
            user: true,
    }});
    res.status(200).json({
        "status": true,
        "message": "Posts retrieved successfully",
        "data": posts
    })
}

exports.getPostById = async (req, res) => {
    const postId = req.params.postId;

    const post = await prisma.post.findUnique({
        where: {
            POSTID: postId
        },
        include: {
            user: true,
            batik: true
        }
    });

    if (!post) {
        return res.status(404).json({
            "status": false,
            "message": "Post not found"
        });
    }

    res.status(200).json({
        "status": true,
        "message": "Post retrieved successfully",
        "data": post
    })

}

exports.getPostsByBatikId = async (req, res) => {
    const batikId = req.params.batikId;

    const count = await prisma.post.count({
        where: {
            BATIKID: batikId
        }
    });

    if (count === 0) {
        return res.status(200).json({
            "status": true,
            "message": "No posts found for this batik"
        });
    }

    const posts = await prisma.post.findMany({
        where: {
            BATIKID: batikId
        }, include: {
            user: true,
            batik: true
        }
    });
    res.status(200).json({
        "status": true,
        "message": "Posts retrieved successfully",
        "data": posts
    })

}

exports.createPost = async (req, res) => {
    const { USERID, BATIKID, CAPTION } = req.body;
    
    if (req.file && req.file.cloudStoragePublicUrl) {
        imageUrl = req.file.cloudStoragePublicUrl
    }

    const post = await prisma.post.create({
        data: {
            USERID: USERID,
            BATIKID: BATIKID,
            POSTIMG: imageUrl,
            CAPTION: CAPTION
        },
        include: {
            user: true,
            batik: true
        }
    });
    res.status(200).json({
        "status": true,
        "message": "Post created successfully",
        "data": post
    })
}

exports.deletePost = async (req, res) => {
    const postId = req.params.postId;

    const post = await prisma.post.findUnique({
        where: {
            POSTID: postId
        }
    });

    if (!post) {
        return res.status(404).json({
            "status": false,
            "message": "Post not found"
        });
    }

    await prisma.post.delete({
        where: {
            POSTID: postId
        }
    });

    res.status(200).json({
        "status": true,
        "message": "Post deleted successfully"
    })
}
