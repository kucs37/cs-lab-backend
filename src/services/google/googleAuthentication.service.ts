import { Injectable, UnauthorizedException } from "@nestjs/common";
import { google, Auth } from "googleapis";
import { config } from "dotenv";
config();

@Injectable()
export class GoogleAuthenticationService {
  oauthClient: Auth.OAuth2Client;
  constructor() {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async authenticate(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);

    const email = tokenInfo.email;

    try {
      if (email) {
        return true;
      }
      //   const user = await this.usersService.getByEmail(email);
      //   return this.handleRegisteredUser(user);
    } catch (error) {
      if (error.status !== 404) {
        throw new error();
      }

      //   return this.registerUser(token, email);
    }
  }

  // ...
}
