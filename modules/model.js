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
    classes = ['BTX01','BTX02','BTX03','BTX04','BTX05','BTX06','BTX07','BTX08','BTX09','BTX10','BTX11','BTX12','BTX13','BTX14','BTX15','BTX16','BTX17','BTX18','BTX19','BTX20','BTX21','BTX22']
    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const label = classes[classResult];
    const result = { label, confidenceScore }
    return label
}