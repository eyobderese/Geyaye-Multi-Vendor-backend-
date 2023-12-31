const Advertisement = require("../models/Advertisement");

const createAdvert = async (req, res) => {
  try {
    let newAdvert = new Advertisement({
      userId: req.user._id,
      content: req.body.content,
      status: "Pending",
    });

    if (req.file) {
      newAdvert.banner = req.file.path;
    }

    newAdvert = await newAdvert.save();

    res.status(200).send(newAdvert);
  } catch (error) {
    console.error("Error creating Advert:", error);
    res.status(500).send("Internal Server Error");
  }
};
const getAdvert = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      // Admin gets only pending advertisements
      const pendingAdvertisements = await Advertisement.find({
        status: "Pending",
      }).exec();
      return res.status(200).send(pendingAdvertisements);
    } else {
      // Other users get approved advertisements
      const approvedAdvertisements = await Advertisement.find({
        status: "Approved",
      }).exec();
      return res.status(200).send(approvedAdvertisements);
    }
  } catch (error) {
    console.error("Error retrieving advertisements:", error);
    throw error;
  }
};

const changeAdvertStatus = async (req, res) => {
  try {
    const advertId = req.params.id;
    let advert = await Advertisement.findById(advertId);

    if (!advert) {
      return res.status(400).send("THE DVERTISMENT IS NOT AVAILABLE ");
    }
    advert.status = "Approved";

    advert = await advert.save();

    return res.send(advert);
  } catch (error) {
    console.error("Error retrieving advertisements:", error);
    throw error;
  }
};

module.exports = { createAdvert, getAdvert, changeAdvertStatus };
