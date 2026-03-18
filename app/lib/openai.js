import {Groq} from "groq-sdk";

const client = new Groq({
    apiKey: process.env.Groq_APi_Key,
})

export default client;