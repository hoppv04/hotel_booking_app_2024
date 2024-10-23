import cloudinary from "cloudinary";
import Hotel from "../models/hotel.model.js";

export const addHotel = async (req, res) => {
  try {
    const imageFiles = req.files;
    const newHotel = req.body;

    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = "data:" + image.mimetype + ";base64," + b64;
      const res = await cloudinary.v2.uploader.upload(dataURI);

      return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = new Hotel(newHotel);
    await hotel.save();

    res.status(201).send(hotel);
  } catch (error) {
    console.log("Error creating hotel: ", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getMyHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });

    res.status(200).json(hotels);
  } catch (error) {
    console.log("Error creating hotel: ", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
