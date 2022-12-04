const cloudinary = require("../../services/app/config/cloudinary")

const streamUpload = (buffer) => {
	return new Promise((resolve, reject) => {
		let stream = cloudinary.uploader.upload_stream((error, result) => {
			if (result) {
				resolve(result);
			} else {
				reject(error);
			}
		});

		const newBuffer = Buffer.from(JSON.parse(buffer))
        const imgStream = Readable.from(newBuffer)
		imgStream.pipe(stream);
	});
};

async function uploader(buffer) {
	let result = await streamUpload(buffer);

	return result;
}

module.exports = uploader;
