import {ProfileSchema} from "../database/models/profileSchema";

class ProfileDto {
  userName: string

  constructor(profile: ProfileSchema) {
    this.userName = profile.username
  }
}

export default ProfileDto