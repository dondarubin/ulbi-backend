import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {EnvironmentService} from './services/environmentService';
import {Postgres} from "./database/database";
import {router} from "./router";
import Fingerprint from "express-fingerprint";
import userRepository from "./repositories/userRepository";
import UserService from "./services/userService";

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

const start = async () => {
  try {
    app.listen(environmentService.get("EXPRESS_PORT"), () =>
      console.log(`✔️ Express started on PORT = ${environmentService.get("EXPRESS_PORT")}`)
    )
  } catch (e) {
    console.log(`❌ Express not started: ${e}`)
  }
}

async function sss() {
  // const res = await UserService.register("fds", "42")
  // console.log(res)
  // if (res) {
  //   throw new Error("❌ User with username is exists!")
  // }
}

sss()

start()
