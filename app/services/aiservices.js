import client from "../lib/openai.js";
import axios from "axios";

export const getPexelImage = async (query) => {
   try{
      const res = await axios.get("https://api.pexels.com/v1/search", {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
      params: {
        query,
        per_page: 1,
      },
    });
    console.log("pexels response:", res.data);
    return res.data.photos[0]?.src?.medium || null;

  } catch (error) {
    console.error("Pexels Error:", error.message);
    return null;
  }
}

export const generateEventPlan = async (prompt) => {
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an AI event planner in India.
            Return ONLY valid JSON in this format:
            {
            "venueName": "",
            "location": "",
            "estimatedCost": "",
            "whyItFits": ""
            }`,
        },
        {
          role: "user",
          content: `Plan an event based on: ${prompt}`,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });

    const content = response.choices[0].message.content;

    const parsed = JSON.parse(content);

    const imageQuery = `${parsed.location} luxury resort`;

    const imageUrl = await getPexelImage(imageQuery);


    return {
        ...parsed,
        imageUrl
    };

  } catch (error) {
    console.error("Error generating event plan:", error);

    return {
      venueName: "Error",
      location: "N/A",
      estimatedCost: "N/A",
      whyItFits: "Something went wrong while generating the plan.",
    };
  }
};



// generateEventPlan();

