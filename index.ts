import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {EnvironmentService} from './services/environmentService';
import {Postgres} from "./database/database";
import {router} from "./router";
import Fingerprint from "express-fingerprint";
import userRepository from "./repositories/userRepository";
import UserService from "./services/UserService";
import {errorMiddleware} from "./middlewares/errorMiddleware";
import UserRepository from "./repositories/userRepository";
import ApiError from "./exceptions/errors";
import {UserSchema} from "./database/models/userSchema";
import bcrypt from "bcryptjs";
import TokenService from "./services/TokenService";
import UserDto from "./dtos/userDto";
import TokenRepository from "./repositories/tokenRepository";
import {ACCESS_TOKEN_EXPIRATION} from "./const/constants";
import tokenService from "./services/TokenService";


export const environmentService = new EnvironmentService();
export const postgres = new Postgres(environmentService);
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: environmentService.get("CLIENT_URL")
}))
app.use(
  Fingerprint({
    // @ts-ignore
    parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders]
  })
)
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
  try {
    app.listen(environmentService.get("EXPRESS_PORT"), () =>
      console.log(`✔️ Express server started on PORT = ${environmentService.get("EXPRESS_PORT")}`)
    )
  } catch (e) {
    console.log(`❌ Express server not started: ${e}`)
  }
}

start()


async function sss() {
  // const res = await UserRepository.getUserData("Mama")
  // console.log(res)
  // console.log(res?.hashed_password)
  // if (!res) {
  //   throw ApiError.BadRequest(`User not found!`)
  // }
  //
  // const user = await userRepository.createUser(username, hashedPassword)
  //
  // console.log(user)

  // const username = 'fdgfsd'
  // const hashedPassword = 'fdgfsd'
  // const newUser = await userRepository.createUser(username, hashedPassword)
  //
  // const userDto = new UserDto(newUser)
  // const accessToken = await TokenService.generateAccessToken({...userDto})
  // console.log(accessToken)

  // const a = await TokenRepository.getRefreshSessionData(1)
  // // console.log(a.map((val)=> val.user_id === 2))
  // let b = a.map(((session) => {
  //   // console.log(session)
  //   if (session.finger_print === "ca496adee8bc4c2530480e72cbc56fff") {
  //     return "return from map"
  //   }
  //
  // }))
  //
  // return b.filter((val)=>val!==undefined)

  // const tokenDataFromDB = await postgres.getTokenData(1)
  // if (tokenDataFromDB.length) {
  //   console.log(tokenDataFromDB)
  // }
  // console.log('none')
  const isValidRefreshToken = tokenService.validateRefreshToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJOYW1lIjoic2FzaGEyMjgiLCJpYXQiOjE3MDg2MzcyNTEsImV4cCI6MTcwOTkzMzI1MX0.kCIj_gN-cohvCM-g8LRXrN_oltK3xLoCScK7grwFq6k")
  console.log(isValidRefreshToken)
}


sss()
// console.log(sss())
// sss().then((res) => console.log(res))