import { Get, JsonController } from "routing-controllers";
import {
  Service
} from "typedi"

interface PingResponse {
  message: string;
}

@Service()
@JsonController("/ping")
export default class PingController {
  @Get()
  public async getMessage(): Promise<PingResponse> {
    return {
      message: "pong",
    };
  }
}