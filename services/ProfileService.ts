import ApiError from "../exceptions/errors";
import ProfileRepository from "../repositories/profileRepository";
import ProfileDto from "../dtos/profileDto";

class ProfileService {
  static async createProfile(user_id: number, username: string) {
    const profileData = await ProfileRepository.createProfile(user_id, username)

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
}

export default ProfileService