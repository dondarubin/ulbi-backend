import {openai, postgres} from "../../index";
import {ChatCompletion, ChatCompletionMessageParam} from "openai/src/resources/chat/completions";
import {ResponseMessage} from "../../database/models/GptSchema";

export async function askGpt(user_id: number, prompt: string, history: ResponseMessage[] | null) {
  let response: ChatCompletion;

  if (history?.length === 0) {
    const message: ChatCompletionMessageParam = {
      role: 'system',
      content: `You are an assistant for a user who visits a site with articles.
              Your tasks include providing new information about various topics
              and checking the relevance of data found in other articles.
              Be thorough, accurate, and ensure your responses are up-to-date. 
              And also, do not use signs such as "*" and try to answer in Russian.
            `
    }

    response = await openai.chat.completions.create({
      model: "google/gemma-7b-it:free",
      // model: "meta-llama/llama-3-8b-instruct:free",
      messages: [
        message,
        {role: 'user', content: prompt},
      ],
    })

    //   добавить в бд system prompt, user prompt и ответ чата
    await postgres.addValueToGptHistory(user_id, message)
    await postgres.addValueToGptHistory(user_id, {role: "user", content: prompt})
    await postgres.addValueToGptHistory(user_id, response.choices[0].message)
  } else {
    response = await openai.chat.completions.create({
      model: "google/gemma-7b-it:free",
      // model: "meta-llama/llama-3-8b-instruct:free",
      messages: [
        ...history as ChatCompletionMessageParam[],
        {role: 'user', content: prompt},
      ],
    })

    //   добавить в бд новый user prompt и ответ чата
    await postgres.addValueToGptHistory(user_id, {role: "user", content: prompt})
    await postgres.addValueToGptHistory(user_id, response.choices[0].message)
  }

  if (!response.choices) {
    return null
  }

  return response.choices[0].message
}