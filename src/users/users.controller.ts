import {
  Body,
  Controller,
  Headers,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GoogleAuthenticationService } from "../services/google/googleAuthentication.service";
import { CreateUserDto } from "./dto/create-user.dto";

import { UsersService } from "./users.service";
import { UserTokenDto } from "./dto/token-.dto";

@Controller("users")
@ApiTags("User")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly googleAuth: GoogleAuthenticationService
  ) {}

  @Post("findUser")
  @ApiBearerAuth()
  // @UseGuards(AuthGuard("google"))
  async googleCallback(@Body() userDto: UserTokenDto, @Req() req) {
    return this.usersService.api_findUser(req); 
  }
}
