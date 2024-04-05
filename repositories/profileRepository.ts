import {postgres} from "../index";
import {ProfileSchema} from "../database/models/profileSchema";

class ProfileRepository{
  static async createProfile(user_id: number, username: string){
    const response = await postgres.createProfileFromRegistration(user_id, username)
    return response[0] as ProfileSchema
  }

  static async getProfileById(profile_id: number){
    const profileDataFromDB = await postgres.getProfileById(profile_id)

    if (!profileDataFromDB.length) {
      return null
    }
    return profileDataFromDB[0] as ProfileSchema
  }
}

export default ProfileRepository;