import {NextFunction, Request, Response} from "express";
import GptService from "../services/GptService";

// const history: messageGpt[] = []

class GptController {
  static async askGpt(req: Request, res: Response, next: NextFunction) {
    try {
      const {prompt, user_id} = req.body

      const gptResponse = await GptService.askGpt(String(prompt), Number(user_id))

      return res.status(200).json({role: gptResponse.role, content: gptResponse.content})
    } catch (err) {
      next(err)
    }
  }

  static async getGptHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = Number(req.params.userId);

      const gptHistory = await GptService.getGptHistory(user_id)

      return res.status(200).json(gptHistory)
    } catch (err) {
      next(err)
    }
  }
}

export default GptController;
