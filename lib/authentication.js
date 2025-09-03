import { cookies } from 'next/headers'; 
import { jwtVerify } from 'jose';

//  to protect user & admin api route

export const isAuthenticated = async (role) => {

    try {
        const cookieStore = await cookies()
        if (!cookieStore.has('access_token')) {
            return {
                isAuth: false
            }
        }

        const access_token = cookieStore.get('access_token')
        const { payload } = await jwtVerify(access_token.value, new TextEncoder().
            encode(process.env.SECRET_KEY))

        if (payload.role !== role) {
            return {
                isAuth: false
            }
        }

        return {
            isAuth: true,
            userId: payload._id
        }

    } catch (error) {

        return {
            isAuth: false,
            error
        }
    }
}
