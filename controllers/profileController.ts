import {NextFunction, Request, Response} from "express";
import ProfileService from "../services/ProfileService";
import {ProfileSchema} from "../database/models/profileSchema";

class ProfileController {
  static async createProfile(username: string) {
    const {
      profile: profileDto
    } = await ProfileService.createProfile(username)
    return {profile: profileDto}
  }

  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profile_id = Number(req.params.profileId);

      const searchingProfile = await ProfileService.getProfileById(profile_id)

      return res.status(200).json(searchingProfile)
    } catch (err) {
      next(err)
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profile_id = Number(req.params.profileId);
      const profileFormData: ProfileSchema = req.body;

      const updatedProfile = await ProfileService.updateProfile(profile_id, profileFormData)

      return res.status(200).json(updatedProfile)
    } catch (err) {
      next(err)
    }
  }
}

export default ProfileController;