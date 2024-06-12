const tf = require('@tensorflow/tfjs-node');
const loadModel = require('../modules/loadModel')
const { spawn } = require('child_process');

exports.predict = async (image) => {
    const model = await loadModel.LoadModel();
    const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat()
    const prediction = model.predict(tensor);
    classes = ['BTX00','BTX01','BTX02','BTX03','BTX04','BTX05','BTX06','BTX07','BTX08','BTX09','BTX10','BTX11','BTX12','BTX13','BTX14','BTX15','BTX16','BTX17','BTX18','BTX19','BTX20','BTX21','BTX22']
    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const label = classes[classResult];
    return label
}

 async function prepareData(dataPromise) {
    const data = await dataPromise;
    const tfidf = new natural.TfIdf();

    // Train TF-IDF model with the data
    data.forEach(item => {
        const postText = item.post.batik.BATIKID;
        tfidf.addDocument(tokenizer.tokenize(postText), item.POSTID); // Add post ID here
    });

    return { tfidf };
}
exports.getRecommendations = async (script, args) => {
    const arguments = args.map(arg => arg.toString());

    const py = spawn("python", [script, ...arguments]);

    const result = await new Promise((resolve, reject) => {
        let output;

        // Get output from python script
        py.stdout.on('data', (data) => {
            output = JSON.parse(data);
        });

        // Handle erros
        py.stderr.on("data", (data) => {
            console.error(`[python] Error occured: ${data}`);
            reject(`Error occured in ${script}`);
        });

        py.on("exit", (code) => {
            console.log(`Child process exited with code ${code}`);
            resolve(output);
        });
    });

    return result;
}