import { connectDB } from "@/lib/databaseConnection"
// Import the database connection function from the lib folder

import { NextResponse } from "next/server"
// Import NextResponse to send JSON responses in Next.js API routes

export async function GET(){

    // Establish a connection to the MongoDB database
    await connectDB()

    // Return a JSON response confirming the connection
    return NextResponse.json({
        success: true, 
        message: 'Connection successful!'
    });
}
    
