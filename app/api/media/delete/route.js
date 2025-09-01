import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import MediaModel from "@/models/Media.model";

// This is an API route handler that performs either a soft delete (SD) 
// or a restore (RSD) operation on media items.
export async function PUT(request) {
    try {
        const auth = await isAuthenticated('admin')
        if (!auth.isAuth) {
            return response(false, 403, 'Unauthorized.')
        }

        await connectDB()
        const payload = await request.json()

        const ids = payload.ids || []
        const deleteType = payload.deleteType

        if (!Array.isArray(ids) || ids.length === 0) {
            return response(false, 400, 'Invalid or empty ID list.')
        }

        const media = await MediaModel.find({ _id: { $in: ids } }).lean()
        if (!media.length) {
            return response(false, 404, 'Data not found.')
        }

        if (!['SD', 'RSD'].includes(deleteType)) {
            return response(false, 400, 'Invalid delete operation. Delete type should be SD or RSD for this route. ')
        }

        if (deleteType === 'SD') {
            await MediaModel.updateMany({ _id: { $in: ids } }, { $set: { deletedAt: new Date().toISOString() } });
        } else {
            await MediaModel.updateMany({ _id: { $in: ids } }, { $set: { deletedAt: null } });
        }

        return response(true, 200, 'Media updated successfully.');

    } catch (error) {
        return catchError(error)
    }
}