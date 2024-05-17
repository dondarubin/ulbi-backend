export enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER'
}

export interface UserSchema {
  user_id: number
  username: string
  hashed_password: string
  roles: UserRoles[]
}

export interface UserWithAvatarSchema {
  user_id: number;
  username: string;
  avatar: string;
}