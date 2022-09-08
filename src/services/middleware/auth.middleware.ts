import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../../auth/interfaces/jwt-payload.interface";
import { LogService } from "../log/log.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private logger = new LogService(AuthMiddleware.name);

  constructor(private jwtService: JwtService) {}
  public async use(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req.headers.authorization.split(" ")[1];
    const decoded: JwtPayload = await this.jwtService.verifyAsync(token);
    const inClass = decoded.inClass;
    this.logger.debug("inClass ->", inClass);
    try {
      if (inClass) {
        console.log("token is work");
        next();
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      this.logger.error(`Middleware -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
