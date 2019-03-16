import { config, v2 } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const cloudinaryConfig = (req, res, next) => {
  config({
    cloudinaryConnectionString: process.env.CLOUDINARY_URL,
  });
  next();
};

export { cloudinaryConfig, v2 };
