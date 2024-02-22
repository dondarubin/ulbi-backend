import { FingerprintResult } from "express-fingerprint"

export interface tokenSchema {
  user_id: number
  refresh_token: string
  finger_print: FingerprintResult
}