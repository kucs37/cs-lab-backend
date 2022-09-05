import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UserLoginDto } from "./dto/login-user";
import { AuthGuard } from "@nestjs/passport";
import { VerifyGoogleDto } from "./dto/verify-google";

@Controller("auth")
@ApiTags("Authentication")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post("studentLogin")
  // loginUser(@Body() userLoginDto: UserLoginDto) {
  //   return this.authService.api_userLogin(userLoginDto);
  // }

  @Post("verifyGoogleAuth")
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async verifyGoogleAuth(
    @Req() req,
  ) {
    return this.authService.api_verifyGoogleAuth(req);
  }

  @Post("verifyToken")
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async verifyToken(
    @Req() req,
  ) {
    return this.authService.api_verifyToken(req);
  }

  // @Get("googleLogin")
  // @UseGuards(AuthGuard("google"))
  // async googleLogin(@Req() req) {}

  // @Get("google/callback")
  // @UseGuards(AuthGuard("google"))
  // async googleCallback(@Req() req) {
  //   return this.authService.googleLogin(req)
  // }
}
