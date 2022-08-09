import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { Auth, google } from "googleapis";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  oauthClient: Auth.OAuth2Client;
  constructor() {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }
  public async use(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req.headers.authorization.split(" ")[1];
    const tokenInfo = await this.oauthClient.getTokenInfo(token);
    const email = tokenInfo.email;
    try {
      if (email) {
        console.log("token is work");
        next();
      }
    } catch (error) {
      if (error.status !== 404) {
        throw new error();
      }
    }
  }
}
