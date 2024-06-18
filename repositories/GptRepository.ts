import {postgres} from "../index";

class GptRepository {
  static async getUserHistory(user_id: number) {
    const response = await postgres.getGptUserHistory(user_id)

    if (!response.length) {
      return null
    }

    return response
  }
}

export default GptRepository;