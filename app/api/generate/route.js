import { NextResponse } from "next/server";
import { generateEventPlan } from "../../services/aiservices";
import {connectDB} from "../../lib/mongodb";
import Event from "../../models/Event";
import User from "../../models/Users";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";



export async function POST(req) {
  try {

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     

    }

    await connectDB();
    const { prompt } = await req.json();

    const result = await generateEventPlan(prompt);
    console.log("Generated Result:", result);

    const user = await User.findOne({ email: session.user.email });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }



    const savedEvent = await Event.create({
      prompt,
      user: user._id,
      ...result,
    });

    console.log("Saved Event:", savedEvent);

    return NextResponse.json({
      success: true,
      result,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error generating event plan" },
      { status: 500 }
    );
  }
}