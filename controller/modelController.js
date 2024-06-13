const predict = require ('../modules/model')
const prisma = require("../prisma/prisma");


exports.predit = async (req, res) => {
const image = req.file
if (!image) {
  return res.status(400).json({
    status: false,
    message: "Invalid input"
  });
}
try {
    const batikId = await predict.predict(image.buffer);
    if ( batikId == "BTX00"){
      const result = "Mohon maaf foto bukan merupakan jenis batik"
      return res.status(400).json({
        status: false,
        message: "Bad request",
        result: result
      });
    }
    const result = await prisma.batik.findUnique({
      where: {
          BATIKID: batikId
      }
  });
    return res.status(200).json({
      status: true,
      message: "Scan successful",
      result: result
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "An unexpected error occurred on the server",
      err: err.toString(),
    });
  }

}

exports.recommed = async (req, res) => {
  const userId = req.params.userid;
  try {
  //   const data = await prisma.post.findMany({
  //     include: {
  //         batik: true,
  //         likes: {
  //             where: {
  //                 USERID: userId
  //             }
  //         }
  //     }
  // });
  // const result = await predict.getRecommendations('./modules/cbf.py',[data,userId]);
    return res.status(200).json({
      status: true,
      message: "This is post that you mike like",
      result: data
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "An unexpected error occurred on the server",
      err: err.toString(),
    });
  }
}