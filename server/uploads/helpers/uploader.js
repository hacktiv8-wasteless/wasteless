const cloudinary = require("../../services/app/config/cloudinary")

const streamUpload = (path) => {
	return new Promise((resolve, reject) => {
		let stream = cloudinary.uploader.upload_stream((error, result) => {
			if (result) {
				resolve(result);
			} else {
				reject(error);
			}
		});

		// const newBuffer = Buffer.from(JSON.parse(buffer))
        const imgStream = Readable.from(path)
		imgStream.pipe(stream);
	});
};

async function uploader(buffer) {
	let result = await streamUpload(buffer);

	return result;
}

module.exports = uploader;
