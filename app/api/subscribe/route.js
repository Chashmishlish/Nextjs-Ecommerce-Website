import { MongoClient } from "mongodb";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) return new Response(JSON.stringify({ message: "Email is required" }), { status: 400 });

    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("yourDatabaseName");
    const collection = db.collection("subscribers");

    await collection.insertOne({ email, subscribedAt: new Date() });
    client.close();

    return new Response(JSON.stringify({ message: "Subscribed successfully" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Subscription failed" }), { status: 500 });
  }
}
