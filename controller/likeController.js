const prisma = require("../prisma/prisma");

exports.getLikesByUser = async (req, res) => {
    const USERID = req.params.userId;

    try {
        const likes = await prisma.likes.findMany({
            where: {
                USERID: USERID
            },
            orderBy: {
                CREATEDAT: 'desc',
            },
            include: {
                user: true,
                post: {
                    include: {
                        user: {
                            select: {
                                USERNAME: true,
                                USERID: true
                            }
                        }
                    },
                }
            }
        })
        res.status(200).json({
            "status": true,
            "message": "Like retrieved successfully",
            "data": likes
        })
    } catch(err) {
        res.status(500).json({
            "status": false,
            "message": "An unexpected error occurred on the server",
            "error": err
        })
    }
}

exports.likePost = async (req, res) => {
    var POSTID = req.body.POSTID;
    const USERID = req.params.userId;

    

    const checkLike = await prisma.likes.count({
        where: {
                USERID: USERID,
                POSTID: POSTID
            }
    })

    if (checkLike === 1) {

        await prisma.likes.delete({
            where: {
                USERID_POSTID: {
                    USERID: USERID,
                    POSTID: POSTID
                
                }
            }
        })

        await prisma.post.update({
            where: {
                POSTID: POSTID
            },
            data: {
                LIKES: {
                    decrement: 1
                }
            }
        })
        res.status(200).json({
            "status": true,
            "message": "Post unliked successfully",
        })
    } else {

    try {
        await prisma.likes.create({
            data: {
                USERID: USERID,
                POSTID: POSTID
            }
        })

        await prisma.post.update({
            where: {
                POSTID: POSTID
            },
            data: {
                LIKES: {
                    increment: 1
                }
            }
        })
        res.status(200).json({
            "status": true,
            "message": "Post liked successfully",
        })
    } catch {
        res.status(500).json({
            "status": false,
            "message": "An unexpected error occurred on the server",
        })
    }}
}
