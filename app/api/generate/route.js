import { NextResponse } from "next/server";
import { generateEventPlan } from "../../services/aiservices";
import {connectDB} from "../../lib/mongodb";
import Event from "../../models/Event";
export async function POST(req) {
  try {
    await connectDB();
    const { prompt } = await req.json();

    const result = await generateEventPlan(prompt);
    console.log("Generated Result:", result);

    const savedEvent = await Event.create({
      prompt,
      ...result,
    });

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