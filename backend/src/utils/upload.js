const multer = require("multer");
//const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    //console.log(req.body);
    callback(null, ".src/uploads");
  },
  filename: function (req, file, callback) {
    //console.log(req.body);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, uniqueSuffix + "-" + file.originalname);
  },
});

exports.upload = multer({ storage: storage }).single("image");
