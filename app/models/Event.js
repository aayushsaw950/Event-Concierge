import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    venueName: {
      type: String,
    },
    location: {
      type: String,
    },
    estimatedCost: {
      type: String,
    },
    whyItFits: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);


export default mongoose.models.Event || mongoose.model("Event", EventSchema);