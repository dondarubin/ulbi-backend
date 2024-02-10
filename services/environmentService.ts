import {DotenvParseOutput, config} from "dotenv"

export interface IEnvironmentService {
  get(key: string): string;
}

export class EnvironmentService implements IEnvironmentService {
  private readonly config: DotenvParseOutput;

  constructor() {
    const {parsed, error} = config();
    if (error) {
      throw new Error("❌ Missing environment file")
    }
    if (!parsed) {
      throw new Error("❌ Missing environment variables")
    }
    this.config = parsed
  }

  public get(key: string): string {
    const res = this.config[key]
    if (!res) {
      throw new Error("❌ Invalid environment value")
    }
    return res
  }

}