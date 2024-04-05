import {ProfileSchema} from "../database/models/profileSchema";

class ProfileDto {
  profileId: number
  userName: string

  constructor(profile: ProfileSchema) {
    this.profileId = profile.user_id
    this.userName = profile.username
  }
}

export default ProfileDto