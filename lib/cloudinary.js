import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.Next_PUBLIC_CLOUDINARY_CLOUD_NAME ,
    api_key: process.env.Next_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

export default cloudinary 