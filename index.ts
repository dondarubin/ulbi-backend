import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {EnvironmentService} from './services/environmentService';
import {Postgres} from "./database/database";
import {router} from "./router";

const environmentService = new EnvironmentService();
const postgres = new Postgres(environmentService);
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
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

start()
