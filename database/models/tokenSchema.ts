import { FingerprintResult } from "express-fingerprint"

export interface TokenSchema {
  user_id: number
  refresh_token: string
  finger_print: FingerprintResult
}