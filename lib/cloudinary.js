import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: Next_PUBLIC_CLOUDINARY_CLOUD_NAME ,
    api_key: Next_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_SECRET_KEY
})

export default cloudinary