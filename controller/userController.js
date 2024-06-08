const { profile } = require("@tensorflow/tfjs-node")
const prisma = require("../prisma/prisma")

exports.getProfile = async (req, res) => {
    const USERID  = req.params.userId

    try{
        const user = await prisma.user.findUnique({
            where: {
                USERID: USERID
            },
            include: {
                post: {
                    include : {
                        batik: true
                 },
                 orderBy: {
                    CREATEDAT: 'asc'
                }
                },
                _count: {
                    select: { 
                        post: true,
                        likes: true
                     }
            },        
        },
           
                
               
    })
        res.status(200).json({
            "status": true,
            "message": "User profile retrieved successfully",
            "data": user,
        })
    }catch{
        res.status(500).json({
            "status": false,
            "message": "An unexpected error occurred on the server",
        })
    }
}

exports.updateProfile = async (req, res) => {
    var USERNAME = req.body.USERNAME
    const USERID = req.params.userId

    const user = await prisma.user.findUnique({
        where: {
            USERID: USERID
        },
    })

    if (!user){
        return res.status(404).json({
            "status": false,
            "message": "User not found",
        })
    }

    if(req.file && req.file.cloudStoragePublicUrl){
        imageUrl = req.file.cloudStoragePublicUrl
    } else {
        imageUrl = user.PROFILEIMG
    }

    try{
        const updatedUser = await prisma.user.update({
            where: {
                USERID: USERID
            },
            data: {
                USERNAME: USERNAME,
                PROFILEIMG: imageUrl,
                UPDATEDAT: new Date()
            }
        
        })
        res.status(200).json({
            "status": true,
            "message": "User profile updated successfully",
            "data": updatedUser,
        })
    }catch{
        res.status(500).json({
            "status": false,
            "message": "An unexpected error occurred on the server",
        })
    }
}
