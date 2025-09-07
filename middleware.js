
import { NextResponse } from "next/server"
import { USER_DASHBOARD, WEBSITE_LOGIN } from "./routes/WebsiteRoute"
import { jwtVerify } from "jose"
import { ADMIN_DASHBOARD } from "./routes/AdminPanelRoutes"

export async function middleware(request) {
    try {
        const pathname = request.nextUrl.pathname
        const hasToken = request.cookies.has('access_token')

        if (!hasToken) {
            if (!pathname.startsWith('/auth')) {
                return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
            }
            return NextResponse.next()
        }

        // verify token 
        const access_token = request.cookies.get('access_token')?.value
        if (!access_token) {
            return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
        }

        const { payload } = await jwtVerify(access_token, new TextEncoder().encode(process.env.SECRET_KEY))
        const role = payload.role

        // prevent logged in users from accessing auth routes
        if (pathname.startsWith('/auth')) {
            return NextResponse.redirect(new URL(role === 'admin' ? ADMIN_DASHBOARD : USER_DASHBOARD, request.nextUrl))
        }

        // protect admin route
        if (pathname.startsWith('/admin') && role !== 'admin') {
            return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
        }

        // protect user routes
        if (pathname.startsWith('/my-account') && role !== 'user') {
            return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
        }

        return NextResponse.next()

    } catch (error) {
        console.error("Middleware Error:", error)
        return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
    }
}

export const config = {
    matcher: ['/admin/:path*', '/my-account/:path*', '/auth/:path*']
}


// // api>auth>verify-otp>route.js ---- access_token || cookieStore.set({...})
// // https://nextjs.org/docs/14/app/building-your-application/routing/middleware