import {postgres} from "../index";

class UserRepository {
  static async createUser(username: string, hashedPassword: string) {
    const response = await postgres.createNewUser(username, hashedPassword)
    return response[0]
  }

  static async getUserData(username: string) {
    const response = await postgres.getUserData(username)

    if (!response.length) {
      return null
    }

    return response[0]
  }
}

export default UserRepository;