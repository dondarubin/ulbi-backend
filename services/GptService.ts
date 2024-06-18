import ApiError from "../exceptions/errors";
import GptRepository from "../repositories/GptRepository";
import {askGpt} from "../utils/askGpt/askGpt";
import {GptRole, ResponseMessage} from "../database/models/GptSchema";

class GptService {
  static async askGpt(prompt: string, user_id: number) {
    const userHistoryFromDB = await GptRepository.getUserHistory(user_id)
    let currentUserHistory: ResponseMessage[];

    if (!userHistoryFromDB) {
      currentUserHistory = []
    } else {
      currentUserHistory = userHistoryFromDB.map(message => ({
        role: message.role as GptRole,
        content: JSON.parse(message.content),
      }));
    }

    const gptResponse = await askGpt(user_id, prompt, currentUserHistory)

    if (!gptResponse) {
      throw ApiError.BadRequest(`gptResponse error!`)
    }

    return gptResponse
  }

  static async getGptHistory(user_id: number) {
    const userHistoryFromDB = await GptRepository.getUserHistory(user_id)
    let currentUserHistory: ResponseMessage[];

    if (!userHistoryFromDB) {
      currentUserHistory = []
    } else {
      currentUserHistory = userHistoryFromDB.map(message => ({
        role: message.role as GptRole,
        content: message.content,
      }));
    }

    return currentUserHistory
  }
}

export default GptService