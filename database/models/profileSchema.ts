
export interface ProfileSchema {
  profile_id: number,
  user_id: number,
  firstname?: string,
  lastname?: string,
  age?: number,
  currency?: string,
  country?: string,
  city?: string,
  username: string,
  avatar?: string
}