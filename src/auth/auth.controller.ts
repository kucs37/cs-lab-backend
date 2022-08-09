import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UserLoginDto } from "./dto/login-user";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
@ApiTags("Authentication")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("studentLogin")
  loginUser(@Body() userLoginDto: UserLoginDto) {
    return this.authService.api_userLogin(userLoginDto);
  }

  @Get("googleLogin")
  @UseGuards(AuthGuard("google"))
  async googleLogin(@Req() req) {}
  
  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleCallback(@Req() req) {
    return this.authService.googleLogin(req)
  }

}
