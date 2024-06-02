const tf = require('@tensorflow/tfjs-node');
const loadModel = require('../modules/loadModel')


exports.predict = async (image) => {
    const model = await loadModel.LoadModel();
    const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat()
    const prediction = model.predict(tensor);
    const score = await prediction.data()
    const confidenceScore = Math.max(...score) * 100;
    classes = ['Aceh', 'Bali', 'Betawi', 'Buketan', 'Cendrawasih', 'Ceplok', 'Corak Insang', 'Dayak', 'Geblek Renteng', 'Gunungan', 'Ikat Celup', 'Jlamprang', 'Kawung', 'Lasem', 'Liong', 'Madura', 'Maluku', 'Megamendung', 'Parang', 'Poleng', 'Prada', 'Pring Sedapur', 'Sekar', 'Sidoluhur', 'Sidomukti', 'Singa Barong', 'Tambal', 'Truntum', 'Tujuh Rupa', 'Tumpal']
    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const label = classes[classResult];
    const result = { label, confidenceScore }
    return label
}