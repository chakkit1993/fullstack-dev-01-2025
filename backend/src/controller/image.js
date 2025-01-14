const prisma = require("../utils/prisma");
const path = require("path"); //for single specific Image
const fs = require("fs"); //for single specific Image
exports.getImage = async (req, res) => {
  try {
    //console.log(req.params.id);
    const image = req.params.id;

    // Construct the path to the image file in the uploads folder based on _id
    // const imagePath = path.join(__dirname, 'uploads', `${req.user._id}-${image.name}`); //"will use when add authentication"
    // const imagePath = path.join(__dirname, 'uploads', `${image.name}`);  //this is disgusting `${}`
    const imagePath = path.join(__dirname, "..", "uploads", image);
    //console.log(imagePath);

    // Check if the file exists
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: "Image file not found" });
    }

    // Send the image file as a response
    res.sendFile(imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve image" });
  }
};
