import {postgres} from "../index";
import {ProfileSchema} from "../database/models/profileSchema";

class ProfileRepository{
  static async createProfile(username: string){
    const response = await postgres.createProfileFromRegistration(username)
    return response[0] as ProfileSchema
  }

  static async getProfileById(user_id: number) {
    const profileDataFromDB = await postgres.getProfileById(user_id)

    if (!profileDataFromDB.length) {
      return null
    }
    return profileDataFromDB[0] as ProfileSchema
  }

  static async updateProfile(user_id: number, profileFormData: ProfileSchema) {
    const updatedProfileDataFromDB = await postgres.updateProfile(user_id, profileFormData)

    if (!updatedProfileDataFromDB.length) {
      return null
    }

    return updatedProfileDataFromDB[0] as ProfileSchema
  }
}

export default ProfileRepository;