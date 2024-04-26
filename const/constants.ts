export const COOKIE_SETTINGS = {
  REFRESH_TOKEN: {
    httpOnly: true,
    maxAge: 1296e6  // 15 * 24 * 60 * 60 * 1000 (15 days)
  }
}
export const ACCESS_TOKEN_EXPIRATION = 18e5 // 1800 * 1000 (30 minutes)

export enum Currency {
  RUB = 'RUB',
  EUR = 'EUR',
  USD = 'USD',
  AED = 'AED',
  JPY = 'JPY',
}

export enum Country {
  RUSSIA = 'Russia',
  BELARUS = 'Belarus',
  KAZAKHSTAN = 'Kazakhstan',
  JAPAN = 'Japan',
  ARMENIA = 'Armenia',
  UAE = 'United Arab Emirates',
  UNITEDSTATES = 'United States',
}

export enum ArticleType {
  IT = 'IT',
  ECONOMY = 'Economy',
  BUSINESS = 'Business',
}
