import {NextFunction, Request, Response} from "express";
import ProfileService from "../services/ProfileService";

class ProfileController {
  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profile_id = Number(req.params.profileId);

      const profile = await ProfileService.getProfileById(profile_id)

      return res.status(200).json(profile)
    } catch (err) {
      next(err)
    }
  }
}

export default ProfileController;