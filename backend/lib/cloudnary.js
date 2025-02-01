import cloudinary from 'cloudinary';
import { configDotenv } from "dotenv";
const { v2: cloudinaryV2 } = cloudinary;

configDotenv();

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'resumebuilder',
      format: 'pdf',
      resource_type: 'raw',
    });
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw error;
  }
};

export default uploadToCloudinary;