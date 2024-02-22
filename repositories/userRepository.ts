import {postgres} from "../index";
import {UserSchema} from "../database/models/userSchema";

class UserRepository {
  static async createUser(username: string, hashedPassword: string) {
    const response = await postgres.createNewUser(username, hashedPassword)
    return response[0] as UserSchema
  }

  static async getUserDataByUsername(username: string) {
    const response = await postgres.getUserDataByUsername(username)

    if (!response.length) {
      return null
    }

    return response[0] as UserSchema
  }

  static async getUserDataById(user_id: number) {
    const response = await postgres.getUserDataById(user_id)

    if (!response.length) {
      return null
    }

    return response[0] as UserSchema
  }
}

export default UserRepository;