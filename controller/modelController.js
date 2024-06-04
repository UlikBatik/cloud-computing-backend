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