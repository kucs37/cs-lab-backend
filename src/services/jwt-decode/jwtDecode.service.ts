/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { JwtPayload } from "../../auth/interfaces/jwt-payload.interface";
import { LogService } from "../log/log.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtDecodeService {
  constructor(private jwtService: JwtService) {}
  private logger = new LogService(JwtDecodeService.name);

  /**
   * @param req
   * @returns
   *
   */
  async jwtDecode(req: any): Promise<JwtPayload> {
    const token = req.headers.authorization.split(" ")[1];
    const decoded: JwtPayload = await this.jwtService.verifyAsync(token);
    return decoded;
  }
}
