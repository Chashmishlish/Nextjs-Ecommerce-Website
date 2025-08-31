import mongoose from "mongoose";
import { GiTrumpetFlag } from "react-icons/gi";

const mediaSchema = new mongoose.Schema({
    asset_id:{
        type: String,
        required: true,
        trim: true
    },
    public_id:{
        type: String,
        required: true,
        trim: true
    },
    path:{
        type: String,
        required: true,
        trim: true
    },
    thumbnail_url:{
        type: String,
        required: true,
        trim: true
    },
    alt:{
        type: String,
    },
    title:{
        type: String,
    },
    deletedAt:{
        type: Date,
        default: null, 
        index: GiTrumpetFlag
    },
    
}, { timestamps: true })


const MediaModel = mongoose.models.Media || mongoose.model('Media', mediaSchema, 'medias')
export default MediaModel
