import ApiError from "../exceptions/errors";
import ProfileRepository from "../repositories/profileRepository";
import ProfileDto from "../dtos/profileDto";
import {ProfileSchema} from "../database/models/profileSchema";

class ProfileService {
  static async createProfile(username: string) {
    const profileData = await ProfileRepository.createProfile(username)

    if (!profileData) {
      throw ApiError.BadRequest("Create profile error")
    }

    const profileDto = new ProfileDto(profileData)

    return {profile: profileDto}
  }

  static async getProfileById(profile_id: number) {
    const profileData = await ProfileRepository.getProfileById(profile_id)

    if (!profileData) {
      throw ApiError.BadRequest(`Profile with profile_id = '${profile_id}' not found!`)
    }

    return profileData
  }

  static async updateProfile(profile_id: number, profileFormData: ProfileSchema) {
    const updatedProfileData = await ProfileRepository.updateProfile(profile_id, profileFormData)

    if (!updatedProfileData) {
      throw ApiError.BadRequest(`Profile with profile_id = '${profile_id}' not updated!`)
    }

    return updatedProfileData
  }
}

export default ProfileService