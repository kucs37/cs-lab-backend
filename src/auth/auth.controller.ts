import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
@ApiTags("Authentication")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("verifyToken")
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async verifyToken(
    @Req() req,
  ) {
    return this.authService.api_verifyToken(req);
  }
}
