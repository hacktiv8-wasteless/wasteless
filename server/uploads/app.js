const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");


const port = process.env.PORT || 4004;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
	res.status(200).json({
		message: "This is upload service",
	});
});

// app.post('/upload', multer({storage: multer.memoryStorage()}).single("file"), async (req, res, next) => {
//     if (req.file) {
//       var originalname = req.file.originalname.split(' ');
//       const fileName = originalname.join('_');
//       try {
//         await minioClient.putObject('test-bucket', fileName, req.file.buffer);
  
//         // get url
//         const url = await minioClient.presignedGetObject('test-bucket', fileName);
  
//         var id = uuid();
//         // link valid for 3 minutes (180 seconds)
//         // save link to redis
//         redisClient.setex(id, 180, url, (err, reply) => {
//           if (err) {
//             return res.json({'success': false, 'message': err});
//           }
//           return res.json({'success': true, 'message': id});
//         });
//       } catch(err) {
//         return res.json({'success': false, 'message': err});
//       }
//     }
//   });

app.post("/", async (req, res) => {
	try {
		const { url } = await uploader(mainImage);

        res.status(200).json({
            url
        })
	} catch (error) {
        console.log(error)
    }
});

app.listen(port, (req, res) => {
	res.send(`Uploader listening on port: ${port}`);
});
