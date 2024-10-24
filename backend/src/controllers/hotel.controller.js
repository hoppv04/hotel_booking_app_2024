import cloudinary from "cloudinary";
import Hotel from "../models/hotel.model.js";

export const addHotel = async (req, res) => {
  try {
    const imageFiles = req.files;
    const newHotel = req.body;

    const imageUrls = await uploadImages(imageFiles);

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
    console.log("Error get hotels: ", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getHotelById = async (req, res) => {
  const id = req.params.id.toString();

  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });

    res.status(200).json(hotel);
  } catch (error) {
    console.log("Error get hotel: ", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const editMyHotel = async (req, res) => {
  try {
    const updatedHotel = req.body;
    updatedHotel.lastUpdate = new Date();

    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: req.params.hotelId,
        userId: req.userId,
      },
      updatedHotel,
      { new: true }
    );

    if (!hotel) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    const files = req.files;
    const updatedImageUrls = await uploadImages(files);

    hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

    await hotel.save();
    res.status(200).json(hotel);
  } catch (error) {
    console.log("Error edit hotel: ", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

async function uploadImages(imageFiles) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);

    return res.url;
  });

  return await Promise.all(uploadPromises);
}
