import { connectDB } from "../../lib/mongodb";
import Event from "../../models/Event";

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return Response.json(events);

  } catch (error) {
    return Response.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}