import {UserSchema} from "../database/models/userSchema";

class UserDto {
  userId: number
  userName: string

  constructor(user: UserSchema) {
    this.userId = user.user_id
    this.userName = user.username
  }
}

export default UserDto