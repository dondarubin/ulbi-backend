import {UserRoles, UserSchema} from "../database/models/userSchema";

class UserDto {
  userId: number
  userName: string
  roles: UserRoles[]

  constructor(user: UserSchema) {
    this.userId = user.user_id
    this.userName = user.username
    this.roles = user.roles
  }
}

export default UserDto