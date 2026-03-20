import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Event from "../../models/Event";
import User from "../../models/Users";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
     const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }


    await connectDB();

     const user = await User.findOne({ email: session.user.email });

     if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

     const events = await Event.find({ user: user._id })
      .sort({ createdAt: -1 });

    return NextResponse.json(events);

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}