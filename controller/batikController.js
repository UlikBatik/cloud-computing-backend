const prisma = require("../prisma/prisma");

exports.getBatiks = async (req, res) => {
    const batiks = await prisma.batik.findMany();
    res.status(200).json({
        "status": true,
        "message": "Batiks retrieved successfully",
        "data": batiks
    });
}

exports.getBatikById = async (req, res) => {
    const batikId = req.params.batikId;

    const batik = await prisma.batik.findUnique({
        where: {
            BATIKID: batikId
        }
    });

    if (!batik) {
        return res.status(404).json({
            "status": false,
            "message": "Batik not found"
        });
    }

    res.status(200).json({
        "status": true,
        "message": "Batik retrieved successfully",
        "data": batik
    });
}

exports.queryBatik = async (req, res) => {
    const { query } = req.query.query;
    const batik = await prisma.batik.findMany({
        where: {
            OR: [
                {
                    BATIKNAME: {
                        contains: query
                    }
                },
                {
                    BATIKDESC: {
                        contains: query
                    }
                }
            ]
        }
    });
    res.status(200).json({
        "status": true,
        "message": "Batik retrieved successfully",
        "data": batik
    });
}
