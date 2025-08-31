import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated } from "@/lib/helperFunction";
import MediaModel from "@/models/Media.model";

export async function GET(request) {
    try {
        const auth = await isAuthenticated('admin')
        if(!auth.isAuth){
            return response (false, 403, 'unauthorized.')
        }

        await connectDB()

        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page'), 10) || 0 
        const limit = parseInt(searchParams.get('limit'), 10) || 10 
        const deleteType = searchParams.get('deleteType')
        
        //SD => soft delete, RSD => Restore soft delete, PD => permanent delete
        let filter = {}
        if(deleteType === 'SD'){
            filter = { deleteType: null }
        } else if (deleteType === 'PD') {
             filter = { deleteAt: { $ne: null } };
        } 

        const mediaData = await MediaModel.find(filter).sort({ createdAt: -1 }).skip(page * limit).limit(limit).lean()
        const totalMedia = await MediaModel.countDocuments(filter)

        return NextResponse.json({
            mediaData: mediaData,
            hasMore: ((page +1) * limit) < totalMedia  //logic
        })


    } catch (error) {
        return catchError(error)
    }
}