export const COOKIE_SETTINGS = {
  REFRESH_TOKEN: {
    httpOnly: true,
    maxAge: 1296e6  // 15 * 24 * 60 * 60 * 1000 (15 days)
  }
}

export const ACCESS_TOKEN_EXPIRATION = 18e5 // 1800 * 1000 (30 minutes)