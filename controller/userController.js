const prisma = require("../prisma/prisma")

exports.getProfile = async (req, res) => {
    const USERID  = req.params.userId

    try{
        const user = await prisma.user.findUnique({
            where: {
                USERID: USERID
            },
            include: {
                post: true,
                _count: {
                    select: { 
                        post: true,
                        likes: true
                     }
            },
        }})
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

    console.log(USERNAME)
    console.log(USERID)

    if (!req.file){
        imageUrl = 'url'
    } else if (req.file && req.file.cloudStoragePublicUrl){
        imageUrl = req.file.cloudStoragePublicUrl
    }

    console.log(imageUrl)

    try{
        console.log('kodingan jalan sampe sini')

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
