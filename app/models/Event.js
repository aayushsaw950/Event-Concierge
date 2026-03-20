import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
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