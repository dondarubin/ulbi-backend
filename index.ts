import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {EnvironmentService} from './services/environmentService';
import {Postgres} from "./database/database";
import {router} from "./router";
import Fingerprint from "express-fingerprint";
import {errorMiddleware} from "./middlewares/errorMiddleware";


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